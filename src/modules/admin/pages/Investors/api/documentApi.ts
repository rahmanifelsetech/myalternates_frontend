import RtkQueryService from "@shared/services/rtkService";
import { InvestorDocumentListResponse, InvestorDocumentResponse, InvestorDocumentFilters, CreateInvestorDocumentPayload, UpdateInvestorDocumentPayload } from "../types/document";
import { objectToFormData } from "@shared/utils/objectToFormData";

const documentApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["InvestorDocuments", "InvestorDocument"],
});

const documentApi = documentApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getInvestorDocuments: builder.query<InvestorDocumentListResponse, InvestorDocumentFilters>({
      query: (params) => ({
        url: '/investors/documents',
        method: 'GET',
        params,
      }),
      providesTags: ["InvestorDocuments"],
    }),
    uploadInvestorDocument: builder.mutation<InvestorDocumentResponse, CreateInvestorDocumentPayload>({
      query: (body) => ({
        url: '/investors/documents',
        method: 'POST',
        data: objectToFormData(body),
      }),
      invalidatesTags: ["InvestorDocuments"],
    }),
    deleteInvestorDocument: builder.mutation<void, string>({
      query: (id) => ({
        url: `/investors/documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["InvestorDocuments"],
    }),
  }),
});
export const {
    useGetInvestorDocumentsQuery,
    useUploadInvestorDocumentMutation,
    useDeleteInvestorDocumentMutation,
} = documentApi;
