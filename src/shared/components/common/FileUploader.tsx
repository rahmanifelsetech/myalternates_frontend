import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ArrowUpIcon, FileIcon } from '@/shared/icons';

interface FileUploaderProps {
  label?: string;
  accept?: Record<string, string[]>;
  maxSize?: number; // in bytes
  onChange?: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  label = 'Click to upload or drag and drop',
  accept,
  maxSize,
  onChange,
  className,
  disabled = false,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        if (onChange) {
          onChange(file);
        }
      }
      
      if (fileRejections.length > 0) {
        console.warn('File rejected:', fileRejections);
        // Handle rejections if needed (e.g. show toast)
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    disabled,
    multiple: false, // Only allow single file upload for now based on usage
  });

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (onChange) {
      onChange(null);
    }
  };
  
  // Clean up object URLs to avoid memory leaks if we were previewing images
  useEffect(() => {
    return () => {
      // cleanup if needed
    };
  }, [selectedFile]);

  return (
    <div className={twMerge('w-full', className)}>
      <div
        {...getRootProps()}
        className={clsx(
          'relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 px-6 py-10 outline-none transition-all hover:bg-gray-100 dark:bg-boxdark dark:hover:bg-gray-800',
          {
            'border-primary bg-blue-50 dark:bg-blue-900/10': isDragActive,
            'border-gray-300 dark:border-strokedark': !isDragActive,
            'opacity-50 cursor-not-allowed': disabled,
          }
        )}
      >
        <input {...getInputProps()} />
        
        {selectedFile ? (
          <div className="flex flex-col items-center justify-center space-y-3">
             <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
              <FileIcon className="h-8 w-8" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-black dark:text-white">
                {selectedFile.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="mt-2 rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              Remove File
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ArrowUpIcon className="h-6 w-6" />
            </span>
            <div className="text-center">
              <p className="text-sm font-medium text-black dark:text-white">
                <span className="text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="mt-1.5 text-xs text-gray-500">
                {label}
              </p>
              {accept && (
                 <p className="mt-1 text-xs text-gray-400">
                  Supported files: {Object.values(accept).flat().join(', ')}
                 </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};