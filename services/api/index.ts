import axios, {
  AxiosInstance,
  AxiosRequestConfig,
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

  private static setAuthorizedApiInterceptors(): void {
    this.authorizedApi.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await StorageService.getData<string>("accessToken");
        console.log("Using token for authorized request:", token);
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        } else {
          delete config.headers["Authorization"];
        }
        return config;
      },
      (error) => Promise.reject(error)
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
