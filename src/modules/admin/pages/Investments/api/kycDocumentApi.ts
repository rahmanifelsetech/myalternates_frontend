import RtkQueryService from "@shared/services/rtkService";
import { objectToFormData } from "@shared/utils/formUtils";
import { DocumentType } from "../types/investmentEnums";

export interface KycDocumentUploadPayload {
  file: File;
  documentType: DocumentType;
  personPan: string;
  personName?: string;
  holderIndex?: number;
}

export interface KycDocumentUploadResponse {
  id: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  documentType: string;
  personPan: string;
  uploadedAt: string;
}

export interface KycBatchUploadPayload {
  documents: KycDocumentUploadPayload[];
}

export interface KycBatchUploadResponse {
  uploadedDocuments: KycDocumentUploadResponse[];
  failedDocuments: Array<{
    documentType: string;
    personPan: string;
    error: string;
  }>;
}

const kycDocumentApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["KycDocuments", "KycDocument"],
});

const kycDocumentApi = kycDocumentApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    uploadKycDocument: builder.mutation<KycDocumentUploadResponse, KycDocumentUploadPayload>({
      query: (payload) => {
        const { file, ...rest } = payload;
        return {
          url: '/persons/upload-kyc',
          method: 'POST',
          data: objectToFormData({ file, ...rest }),
        };
      },
      invalidatesTags: ["KycDocuments"],
    }),
    uploadKycDocumentsBatch: builder.mutation<KycBatchUploadResponse, KycBatchUploadPayload>({
      query: (payload) => {
        const formData = new FormData();
        payload.documents.forEach((doc, index) => {
          formData.append(`documents[${index}].file`, doc.file);
          formData.append(`documents[${index}].documentType`, doc.documentType);
          formData.append(`documents[${index}].personPan`, doc.personPan);
          if (doc.personName) {
            formData.append(`documents[${index}].personName`, doc.personName);
          }
          if (doc.holderIndex !== undefined) {
            formData.append(`documents[${index}].holderIndex`, doc.holderIndex.toString());
          }
        });
        return {
          url: '/persons/upload-kyc',
          method: 'POST',
          data: formData,
        };
      },
      invalidatesTags: ["KycDocuments"],
    }),
    deleteKycDocument: builder.mutation<void, string>({
      query: (id) => ({
        url: `/persons/kyc-documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["KycDocuments"],
    }),
  }),
});

export const {
  useUploadKycDocumentMutation,
  useUploadKycDocumentsBatchMutation,
  useDeleteKycDocumentMutation,
} = kycDocumentApi;
