import ApiService from '@/shared/services/ApiService';

export const downloadMarketListTemplate = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('authToken');
    const response = ApiService.get<Blob>('/masters/market-list/template/download', {
      headers: {
        'Authorization': `Bearer ${token || ''}`,
      },
      responseType: 'blob',
    });

    const blob = await response;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'market-list-template.xlsx');
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading template:', error);
    throw error;
  }
};
