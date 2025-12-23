import { toast, ToastOptions } from 'react-toastify';
import { useCallback } from 'react';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  style: {
    fontSize: '14px',
    zIndex: 99999,
  },
};

export const useToast = () => {
  const success = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.success(message, { ...defaultOptions, ...options });
    },
    []
  );

  const error = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.error(message, { ...defaultOptions, ...options });
    },
    []
  );

  const warning = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.warning(message, { ...defaultOptions, ...options });
    },
    []
  );

  const info = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.info(message, { ...defaultOptions, ...options });
    },
    []
  );

  const loading = useCallback(
    (message: string, options?: ToastOptions) => {
      toast.loading(message, { ...defaultOptions, ...options });
    },
    []
  );

  return { success, error, warning, info, loading, toast };
};
