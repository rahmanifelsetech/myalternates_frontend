import { AxiosError, AxiosRequestConfig } from "axios";
// import { ApiError } from "@shared/types/api";
import ApiClient, { handleError } from "./baseService";


/**
 * Generic request method
 */
const request = async <T,>(
  method: AxiosRequestConfig['method'],
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await ApiClient.request<T>({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

/**
 * Upload request with FormData
 */
const upload = async <T,>(
  url: string,
  formData: FormData,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await ApiClient.request<T>({
      method: 'POST',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError);
  }
};

/**
 * HTTP Methods
 */

export const ApiService = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request<T>('GET', url, undefined, config);
  },

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return request<T>('POST', url, data, config);
  },

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return request<T>('PUT', url, data, config);
  },

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return request<T>('PATCH', url, data, config);
  },

  deleteRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request<T>('DELETE', url, undefined, config);
  },

  uploadFile<T>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    return upload<T>(url, formData, config);
  },

  setToken(token: string): void {
    ApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  },

  clearToken(): void {
    delete ApiClient.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
  },

  async downloadFile(url: string, filename: string): Promise<void> {
    try {
      const response = await ApiClient.get(url, {
        responseType: 'blob',
      });
      
      const blob = new Blob([response.data], { type: response.headers['content-type'] || 'application/octet-stream' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      handleError(error as AxiosError);
    }
  },
};


export default ApiService;
