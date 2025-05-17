import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";
import StorageService from "../storage";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

class ApiService {
  private static unauthorizedApi = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  private static authorizedApi: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  private static async setAuthorizedApiToken(): Promise<void> {
    const token = await StorageService.getData<string>("accessToken");
    if (token) {
      this.authorizedApi.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.authorizedApi.defaults.headers["Authorization"];
    }
  }

  private static async refreshAccessToken(): Promise<void> {
    try {
      const refreshToken = await StorageService.getData<string>("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const newAccessToken = response.data.data.accessToken;
      const newRefreshToken = response.data.data.newRefreshToken;

      if (newAccessToken) {
        await StorageService.saveData("accessToken", newAccessToken);
        this.setAuthorizedApiToken();
      }

      if (newRefreshToken) {
        await StorageService.saveData("refreshToken", newRefreshToken);
        this.setAuthorizedApiToken();
      }
    } catch (error: any) {
      console.error("Error refreshing access token:", error.response?.data);
      throw error; // Re-throw the error to handle it further if needed
    }
  }

  private static setAuthorizedApiInterceptors(): void {
    this.authorizedApi.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await StorageService.getData<string>("accessToken");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          delete config.headers["Authorization"];
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.authorizedApi.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        console.log("Going to print the error message");
        //@ts-ignore
        console.log(error.response?.data?.message);
        if (
          error.response?.status === 401 &&
          //@ts-ignore
          error.response?.data?.message?.toLowerCase().includes("expired")
        ) {
          try {
            // Refresh the token
            await this.refreshAccessToken();
            const originalRequest = error.config;
            if (originalRequest) {
              await this.setAuthorizedApiToken();
              return this.authorizedApi(originalRequest);
            }
          } catch (refreshError) {
            // Handle token refresh failure
            console.error("Token refresh failed:", refreshError);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public static initialize(): void {
    this.setAuthorizedApiInterceptors();
  }

  public static get unauthorized() {
    return this.unauthorizedApi;
  }

  public static get authorized() {
    return this.authorizedApi;
  }
}

ApiService.initialize();

export default ApiService;
