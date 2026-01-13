import { forwardRef, useState, useEffect } from "react";
import { EyeIcon } from "@/shared/icons";
import appConfig from "@/shared/config/app.config";
import { Modal } from "@/shared/components/ui/modal/Modal";
import Button from "@/shared/components/ui/button/Button";

interface FileInputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  imageUrl?: string;
  removable?: boolean;
  onRemove?: (url: string) => void;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ className, onChange, name, onBlur, disabled, imageUrl, removable = true, onRemove }, ref) => {
  const [isRemoved, setIsRemoved] = useState(false);
  const [hasNewFile, setHasNewFile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsRemoved(false);
    setHasNewFile(false);
  }, [imageUrl]);

  const showImage = imageUrl && !isRemoved && !hasNewFile;
  const fullImageUrl = imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `${appConfig.baseUrl}${imageUrl}`) : '';

  const getFileNameFromUrl = (url: string) => {
    try {
      const parts = url.split('/');
      const fileNameWithHash = parts[parts.length - 1];
      const nameParts = fileNameWithHash.split('-');
      
      // If there's only one part or it doesn't match the expected pattern, return the whole name
      if (nameParts.length < 2) return fileNameWithHash;

      // Assume the last part is the timestamp/hash + extension
      // We want to remove the timestamp part but keep the extension
      
      // Example: user-A-12345.jpg
      // nameParts: ['user', 'A', '12345.jpg']
      
      const lastPart = nameParts[nameParts.length - 1]; // 12345.jpg
      const extensionParts = lastPart.split('.');
      const extension = extensionParts.length > 1 ? `.${extensionParts.pop()}` : ''; // .jpg
      
      // Rejoin everything except the last dash-part
      const nameWithoutLastPart = nameParts.slice(0, -1).join('-'); // user-A
      
      return `${nameWithoutLastPart}${extension}`;
    } catch (e) {
      return url;
    }
  };

  const fileName = imageUrl ? getFileNameFromUrl(imageUrl) : '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasNewFile(true);
    if (onChange) {
      onChange(e);
    }
  };

  const handleRemove = () => {
    setIsRemoved(true);
    setIsModalOpen(false);
    if (onRemove && imageUrl) {
      onRemove(imageUrl);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 w-full">
        <div className="relative w-full">
          <input
            type="file"
            ref={ref}
            name={name}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400 ${showImage ? '!text-transparent' : ''} ${className}`}
          />
          {showImage && (
            <div className="absolute top-2.5 right-10 px-4 flex items-center pointer-events-none">
              <span className="text-sm text-gray-900 dark:text-gray-300 truncate w-full">
                {fileName}
              </span>
            </div>
          )}
        </div>
        {showImage && (
          <div className="relative group h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/[0.03]">
            <img
              src={fullImageUrl}
              alt="Preview"
              className="w-full h-full object-contain p-1"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-white hover:text-gray-200"
              >
                <EyeIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="max-w-[500px] p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Image Preview</h3>
          </div>
          
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <img
              src={fullImageUrl}
              alt="Full Preview"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            {removable && (
              <Button variant="primary" className="bg-error-600 hover:bg-error-700" onClick={handleRemove}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
});

export default FileInput;
