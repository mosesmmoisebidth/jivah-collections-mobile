import axios, {
  AxiosRequestConfig,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import StorageService from "../storage";

const BASE_URL = "https://jivah-collections-backend.onrender.com/api/v1";

class ApiService {
  private static unauthorizedApi = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  private static authorizedApi = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  private static async getToken(): Promise<string | null> {
    try {
      return await StorageService.getData<string>("accessToken");
    } catch (error) {
      console.error("Error retrieving token from storage:", error);
      return null;
    }
  }

  private static async setAuthorizedApiToken(): Promise<void> {
    const token = await this.getToken();
    if (token) {
      this.authorizedApi.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  private static setAuthorizedApiInterceptors(): void {
    this.authorizedApi.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        try {
          // Set token immediately after initialization
          await this.setAuthorizedApiToken();
        } catch (error) {
          console.error("Error retrieving token:", error);
        }
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );
  }

  public static initialize(): void {
    this.setAuthorizedApiInterceptors();
    // Immediately add token to the authorizedApi on initialization
    this.setAuthorizedApiToken();
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
