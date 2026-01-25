import { useCallback } from 'react';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import {
  useUploadFileMutation,
  useTriggerExternalApiFetchMutation,
  useDownloadTemplateMutation,
} from '../api/uploadApi';
import type { UploadType, ExternalApiJobType, UploadMetadata } from '../types/upload';

export const useUploadManagement = () => {
  const { execute } = useAsyncMutation();

  const [uploadFileMutation] = useUploadFileMutation();
  const [triggerExternalApiFetchMutation] = useTriggerExternalApiFetchMutation();
  const [downloadTemplateMutation] = useDownloadTemplateMutation();

  const handleFileUpload = useCallback(
    (file: File, metadata: UploadMetadata) =>
      execute(
        uploadFileMutation,
        { file, metadata },
        {
          successMessage: 'File uploaded successfully and queued for processing!',
          errorMessage: 'Failed to upload file',
        }
      ),
    [uploadFileMutation, execute]
  );

  const handleDownloadTemplate = useCallback(
    async (type: UploadType) => {
      try {
        const response = await downloadTemplateMutation({ type }).unwrap();
        
        // Create blob from response
        const blob = new Blob([response as unknown as BlobPart], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${type.toLowerCase()}_template.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Failed to download template', error);
        // Error toast will be handled by UI or we can add toast here if needed
        throw error;
      }
    },
    [downloadTemplateMutation]
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
    handleDownloadTemplate,
  };
};
