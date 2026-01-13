import { useCallback } from 'react';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import {
  useUploadFileMutation,
  useTriggerExternalApiFetchMutation,
} from '../api/uploadApi';
import type { UploadType, ExternalApiJobType } from '../types/upload';

export const useUploadManagement = () => {
  const { execute } = useAsyncMutation();

  const [uploadFileMutation] = useUploadFileMutation();
  const [triggerExternalApiFetchMutation] = useTriggerExternalApiFetchMutation();

  const handleFileUpload = useCallback(
    (uploadType: UploadType, file: File) =>
      execute(
        uploadFileMutation,
        { type: uploadType, file },
        {
          successMessage: 'File uploaded successfully!',
          errorMessage: 'Failed to upload file',
        }
      ),
    [uploadFileMutation, execute]
  );

  const handleTriggerExternalApiFetch = useCallback(
    (jobType: ExternalApiJobType) =>
      execute(
        triggerExternalApiFetchMutation,
        { jobType },
        {
          successMessage: 'External API fetch initiated successfully!',
          errorMessage: 'Failed to trigger external API fetch',
        }
      ),
    [triggerExternalApiFetchMutation, execute]
  );

  return {
    handleFileUpload,
    handleTriggerExternalApiFetch,
  };
};
