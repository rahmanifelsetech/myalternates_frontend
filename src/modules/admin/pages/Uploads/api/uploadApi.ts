import RtkQueryService from '@shared/services/rtkService';
import { UploadType, UploadHistoryFilters, GetUploadHistoryResponse, UploadFileResponse } from '../types/upload';

export const uploadApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['UploadHistory'],
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
  }),
});

export const {
  useGetUploadHistoryQuery,
  useUploadFileMutation,
} = uploadApi;