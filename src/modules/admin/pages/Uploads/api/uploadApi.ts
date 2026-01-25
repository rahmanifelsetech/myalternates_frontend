import RtkQueryService from '@shared/services/rtkService';
import { UploadType, UploadHistoryFilters, GetUploadHistoryResponse, UploadFileResponse, UploadLog, UploadLogDetail, ExternalApiJobType, TriggerExternalApiResponse, UploadMetadata } from '../types/upload';
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
    getUploadLogs: builder.query<PaginatedResponse<UploadLog>, { page: number, limit: number, logType: 'DATA_FETCHING' | 'DATA_UPLOAD' }>({
      query: (params) => ({
        url: '/populate/external/logs',
        method: 'GET',
        params,
      }),
      providesTags: ['UploadLogs'],
    }),
    uploadFile: builder.mutation<UploadFileResponse, { file: File; metadata: UploadMetadata }>({
      query: ({ file, metadata }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('uploadType', metadata.uploadType);
        formData.append('source', metadata.source);
        formData.append('processMode', metadata.processMode);
        formData.append('fileType', metadata.fileType);
        if (metadata.uploadedBy) formData.append('uploadedBy', metadata.uploadedBy);
        
        return {
          url: `/data-upload/bulk`,
          method: 'POST',
          data: formData,
        };
      },
      invalidatesTags: ['UploadLogs'],
    }),
    downloadTemplate: builder.mutation<Blob, { type: UploadType }>({
      query: ({ type }) => ({
        url: `/data-upload/template/${type}`,
        method: 'GET',
        responseType: 'blob',
      }),
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
  useDownloadTemplateMutation,
} = uploadApi;