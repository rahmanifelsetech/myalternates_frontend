import RtkQueryService from '@shared/services/rtkService';
import { UploadType, UploadHistoryFilters, GetUploadHistoryResponse, UploadFileResponse, UploadLog, UploadLogDetail, ExternalApiJobType, TriggerExternalApiResponse } from '../types/upload';
import { PaginatedResponse, SingleResponse } from '@shared/types/api';

export const uploadApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['UploadHistory', 'UploadLogs'],
}).injectEndpoints({
  endpoints: (builder) => ({
    getUploadHistory: builder.query<GetUploadHistoryResponse, { type: UploadType } & UploadHistoryFilters>({
      query: ({ type, ...params }) => ({
        url: `/data-upload/${type}/history`,
        method: 'GET',
        params,
      }),
      providesTags: (result, error, { type }) => [{ type: 'UploadHistory', id: type }],
    }),
    getUploadLogs: builder.query<PaginatedResponse<UploadLog>, { page: number, limit: number }>({
      query: (params) => ({
        url: '/populate/external/logs',
        method: 'GET',
        params,
      }),
      providesTags: ['UploadLogs'],
    }),
    uploadFile: builder.mutation<UploadFileResponse, { type: UploadType; file: File }>({
      query: ({ type, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `/data-upload/${type}`,
          method: 'POST',
          data: formData,
        };
      },
      invalidatesTags: (result, error, { type }) => [{ type: 'UploadHistory', id: type }],
    }),
    triggerExternalApiFetch: builder.mutation<TriggerExternalApiResponse, { jobType: ExternalApiJobType }>({
      query: ({ jobType }) => ({
        url: '/populate/external/trigger',
        method: 'POST',
        data: { jobType },
      }),
      invalidatesTags: ['UploadLogs'],
    }),
    getUploadLogDetail: builder.query<SingleResponse<UploadLogDetail>, string>({
      query: (logId) => ({
        url: `/populate/external/logs/${logId}`,
        method: 'GET',
      }),
      providesTags: (result, error, logId) => [{ type: 'UploadLogs', id: logId }],
    }),
  }),
});

export const {
  useGetUploadHistoryQuery,
  useUploadFileMutation,
  useGetUploadLogsQuery,
  useGetUploadLogDetailQuery,
  useTriggerExternalApiFetchMutation,
} = uploadApi;