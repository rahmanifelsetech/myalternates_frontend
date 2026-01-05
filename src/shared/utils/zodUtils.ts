import * as z from 'zod';

interface FileValidationOptions {
    maxSize?: number; // in bytes
    acceptedTypes?: string[];
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const fileValidation = ({
    maxSize = DEFAULT_MAX_SIZE,
    acceptedTypes = DEFAULT_ACCEPTED_TYPES
}: FileValidationOptions = {}) => {
    return z.any()
        .refine((files) => {
            if (!files) return true;
            // If it's a FileList or array of Files
            if (files instanceof FileList || Array.isArray(files)) {
                return files.length === 0 || acceptedTypes.includes(files[0]?.type);
            }
            // If it's a single File
            if (files instanceof File) {
                return acceptedTypes.includes(files.type);
            }
            // If it's a string (URL) - assume valid as it's from server
            if (typeof files === 'string') return true;
            
            return true;
        }, `Only ${acceptedTypes.map(t => t.split('/')[1]).join(', ')} formats are supported.`)
        .refine((files) => {
            if (!files) return true;
            if (files instanceof FileList || Array.isArray(files)) {
                return files.length === 0 || files[0]?.size <= maxSize;
            }
            if (files instanceof File) {
                return files.size <= maxSize;
            }
            return true;
        }, `Max file size is ${maxSize / (1024 * 1024)}MB.`);
};