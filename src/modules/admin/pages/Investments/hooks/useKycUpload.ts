import { useCallback } from 'react';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { useUploadKycDocumentMutation, useUploadKycDocumentsBatchMutation } from '../api/kycDocumentApi';
import type { KycDocumentUploadPayload, KycDocumentUploadResponse, KycBatchUploadPayload, KycBatchUploadResponse } from '../api/kycDocumentApi';

interface UseKycUploadOptions {
  onSuccess?: (response: KycDocumentUploadResponse | KycBatchUploadResponse) => void;
  onError?: (error: any) => void;
}

export const useKycUpload = (options?: UseKycUploadOptions) => {
  const { execute } = useAsyncMutation();
  const [uploadMutation, { isLoading: isSingleLoading }] = useUploadKycDocumentMutation();
  const [uploadBatchMutation, { isLoading: isBatchLoading }] = useUploadKycDocumentsBatchMutation();

  const handleUploadSingle = useCallback(
    async (payload: KycDocumentUploadPayload) => {
      try {
        const response: any = await execute(uploadMutation, payload, {
          successMessage: `${payload.documentType} uploaded successfully!`,
          errorMessage: `Failed to upload ${payload.documentType}`,
        });
        
        options?.onSuccess?.(response as KycDocumentUploadResponse);
        return response;
      } catch (error) {
        options?.onError?.(error);
        throw error;
      }
    },
    [uploadMutation, execute, options]
  );

  const handleUploadBatch = useCallback(
    async (payload: KycBatchUploadPayload) => {
      try {
        const response: any = await execute(uploadBatchMutation, payload, {
          successMessage: `${payload.documents.length} document(s) uploaded successfully!`,
          errorMessage: 'Failed to upload documents',
        });
        
        options?.onSuccess?.(response as KycBatchUploadResponse);
        return response;
      } catch (error) {
        options?.onError?.(error);
        throw error;
      }
    },
    [uploadBatchMutation, execute, options]
  );

  return {
    handleUploadSingle,
    handleUploadBatch,
    isLoading: isSingleLoading || isBatchLoading,
  };
};
