import { createApi } from '@reduxjs/toolkit/query/react'
import ApiClient, { handleRtkError } from './baseService'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'

const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
    > =>
    async (request) => {
        try {
            const response = await ApiClient(request)
            console.log('baseQuery response', response);
            return response
        } catch (axiosError) {
            console.log('baseQuery error', axiosError);
            return handleRtkError(axiosError as AxiosError);
        }
    }

const RtkQueryService = createApi({
    reducerPath: 'rtkApi',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
})

export default RtkQueryService
