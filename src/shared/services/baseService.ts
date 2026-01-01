import axios, { AxiosInstance, AxiosError } from 'axios';
import appConfig from '@shared/config/app.config';
import { ApiError } from '../types/api';

/**
 * Create axios instance with interceptors
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: appConfig.apiPrefix,
    timeout: 10000,
    headers: {
      // 'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (config.data instanceof FormData) {
        // Let the browser set the correct multipart boundary automatically
        config.headers['Content-Type'] = undefined;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      if (import.meta.env.DEV) {
        console.log(`✓ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
      }
      return response
    },
    (error: AxiosError) => {
      console.error(`✗ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.response?.data);
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = appConfig.unAuthenticatedEntryPath;
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const ApiClient = createApiClient();


/**
 * Handle errors consistently
 */
export const handleError = (error: AxiosError): never => {
  const apiError = error.response?.data as ApiError;
  const message = apiError?.message || error.message || 'Something went wrong';
  
  const customError = new Error(message) as Error & { details?: any; response?: any };
  customError.details = apiError?.details;
  customError.response = error.response;

  console.log('API Error:', customError);
  
  throw customError;
};

export const handleRtkError = (error: AxiosError) => {
  const apiError = error.response?.data as ApiError;
  const message = apiError?.message || error.message || 'Something went wrong';
  
  const customError = new Error(message) as Error & { details?: any; response?: any };
  customError.details = apiError?.details;
  customError.response = error.response;

  console.log('API Error:', customError);
  
  return {
    error: {
      status: error.response?.status,
      data: error.response?.data || error.message,
    },
  }
}


/**
 * Export axios instance for RTK Query
 */
export default ApiClient;
