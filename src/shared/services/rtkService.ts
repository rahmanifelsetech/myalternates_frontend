import { createApi } from '@reduxjs/toolkit/query/react'
import ApiClient, { handleRtkError } from './baseService'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'

// const axiosBaseQuery =
//     (): BaseQueryFn<
//         {
//             url: string
//             method: AxiosRequestConfig['method']
//             data?: AxiosRequestConfig['data']
//             params?: AxiosRequestConfig['params']
//         },
//         unknown,
//         unknown
//     > =>
//     async (request) => {
//         try {
//             const response = await ApiClient(request)
//             console.log('baseQuery response', response);
//             return response
//         } catch (axiosError) {
//             console.log('baseQuery error', axiosError);
//             return handleRtkError(axiosError as AxiosError);
//         }
//     }

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params'],
      headers?: AxiosRequestConfig['headers'],
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params}) => {
    try {
        // console.log('is data instance of formdata: ', data instanceof FormData); // MUST be true

        const headers: AxiosRequestConfig['headers'] = {};
        if (data instanceof FormData) {
            headers['Content-Type'] = undefined;
        } else {
            headers['Content-Type'] = 'application/json';
        }
        
        const response = await ApiClient({
            url,
            method,
            data,
            params,
            headers,
        });

        // console.log('baseQuery response', response);

        return { data: response.data };
    } catch (axiosError) {
        console.log('baseQuery error', axiosError);
        return handleRtkError(axiosError as AxiosError);
    }
  };

const RtkQueryService = createApi({
    reducerPath: 'rtkApi',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
})

export default RtkQueryService

