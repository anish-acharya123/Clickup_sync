import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import { config } from "process";
class ApiService {
  private axiosInstance: AxiosInstance;
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      return config;
    });

    this.axiosInstance.interceptors.response.use((response) => {
      return response;
    });
  }

  /// for get request
  public async get<T>(
    url: string,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(url, config);
  }

  //// post request
  public async post<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(url, data, config);
  }

  //////// put request
  public async put<T>(
    url: string,
    data: unknown,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put(url, data, config);
  }

  // delete request
  public async delete<T>(
    url: string,
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(url, config);
  }
}

const apiServices = new ApiService("/htt");

export default apiServices;
