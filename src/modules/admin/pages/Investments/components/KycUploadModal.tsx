import React, { useState } from 'react';
import { Modal } from '@/shared/components/ui/modal/Modal';
import Button from '@/shared/components/ui/button/Button';
import { TrashBinIcon } from '@/shared/icons';
import { useKycUpload } from '../hooks/useKycUpload';
import { DocumentType, documentTypeLabels } from '../types/investmentEnums';

interface KycUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    holderFields: any[];
    watch: any;
    onUploadSuccess: (docType: string, response: any) => void;
    uploadedDocs: any;
    onRemoveDoc: (docType: string) => void;
    initialHolderIndex?: number;
}

const docLabels = documentTypeLabels;

export const KycUploadModal: React.FC<KycUploadModalProps> = ({
    isOpen,
    onClose,
    holderFields,
    watch,
    onUploadSuccess,
    uploadedDocs,
    onRemoveDoc,
    initialHolderIndex = 0,
}) => {
    const [selectedHolderForKyc, setSelectedHolderForKyc] = useState<number>(initialHolderIndex);

    // Update selected holder when modal opens or initialHolderIndex changes
    React.useEffect(() => {
        if (isOpen) {
            setSelectedHolderForKyc(initialHolderIndex);
        }
    }, [isOpen, initialHolderIndex]);

    const [pendingFiles, setPendingFiles] = useState<Record<string, File | null>>({
        pan: null,
        addressProof: null,
        bankProof: null,
        others: null,
    });
    const { handleUploadBatch, isLoading: isKycUploading } = useKycUpload({
        onSuccess: (response: any) => {
            onUploadSuccess(response.documentType || 'unknown', response);
        },
    });

    const handleFileSelect = (docType: DocumentType, file: File) => {
        const holderPan = watch(`holders.${selectedHolderForKyc}.pan`);
        
        if (!holderPan) {
            alert('Please enter PAN for the selected holder first');
            return;
        }

        setPendingFiles((prev) => ({
            ...prev,
            [docType]: file,
        }));
    };

    const handleRemoveFile = (docType: DocumentType) => {
        setPendingFiles((prev) => ({
            ...prev,
            [docType]: null,
        }));
    };

    const handleSubmitUploads = async () => {
        // Get all files with their document types
        const filesToUpload = (Object.entries(pendingFiles) as [string, File | null][])
            .filter(([_, file]) => file !== null)
            .map(([docType, file]) => {
                return {
                    file: file!,
                    documentType: docType as DocumentType,
                    personPan: watch(`holders.${selectedHolderForKyc}.pan`),
                    personName: watch(`holders.${selectedHolderForKyc}.name`),
                    holderIndex: selectedHolderForKyc,
                };
            });

        if (filesToUpload.length === 0) {
            alert('Please select at least one document to upload');
            return;
        }

        try {
            const response = await handleUploadBatch({ documents: filesToUpload });
            
            // Process each uploaded document from the batch response
            if (response?.documents && Array.isArray(response.documents)) {
                response.documents.forEach((doc: any) => {
                    // Convert documentType like 'pan' to key 'pan', 'addressProof', etc.
                    const docTypeKey = doc.documentType.toLowerCase() === 'pan' ? 'pan' 
                        : doc.documentType.toLowerCase() === 'addressproof' ? 'addressProof'
                        : doc.documentType.toLowerCase() === 'bankproof' ? 'bankProof'
                        : 'others';
                    
                    // Call onUploadSuccess with the entire document object
                    onUploadSuccess(docTypeKey, doc);
                });
            }
            
            // Clear pending files after successful upload
            setPendingFiles({
                pan: null,
                addressProof: null,
                bankProof: null,
                others: null,
            });
        } catch (err) {
            console.error('Batch upload failed:', err);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                <div className="border-b pb-4">
                    <h2 className="text-xl font-semibold">Upload KYC Documents</h2>
                </div>

                {/* Holder Details */}
                {holderFields && holderFields.length > 0 && holderFields[selectedHolderForKyc] && (
                    <div className="mb-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                Name: {watch(`holders.${selectedHolderForKyc}.name`) || 'N/A'}
                            </p>
                            <p className="text-sm font-medium">
                                PAN: {watch(`holders.${selectedHolderForKyc}.pan`) || 'N/A'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Upload Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.values(DocumentType).map((docType) => {
                        // Check if a document of this type exists for the CURRENTLY selected holder
                        // The uploadedDocs structure seems to be flat: { pan: { holderIndex: 0, ... }, addressProof: { ... } } 
                        // But wait, the previous implementation suggests uploadedDocs is flat by docType: uploadedDocs[docType]
                        // If uploadedDocs[docType] exists, we must check if it belongs to selectedHolderForKyc
                        
                        const uploadedDoc = uploadedDocs[docType];
                        const isUploadedForCurrentHolder = uploadedDoc && uploadedDoc.holderIndex === selectedHolderForKyc;
                        
                        const uploaded = isUploadedForCurrentHolder ? uploadedDoc : null;
                        const pending = pendingFiles[docType];
                        
                        return (
                            <div key={docType} className="border p-4 rounded bg-gray-50">
                                <label className="block text-sm font-medium mb-3">{docLabels[docType]}</label>
                                {uploaded ? (
                                    <div>
                                        <div className="p-3 bg-green-50 border border-green-200 rounded">
                                            <p className="text-sm font-medium text-green-700">✓ Uploaded</p>
                                            <p className="text-xs text-green-600 mt-1">{uploaded.fileName}</p>
                                            <p className="text-xs text-gray-500 mt-1">Holder {uploaded.holderIndex + 1}</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onRemoveDoc(docType)}
                                            className="mt-2 w-full flex items-center justify-center gap-2"
                                        >
                                            <TrashBinIcon className="w-4 h-4" />
                                            Remove
                                        </Button>
                                    </div>
                                ) : pending ? (
                                    <div>
                                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                                            <p className="text-sm font-medium text-yellow-700">⏳ Pending Upload</p>
                                            <p className="text-xs text-yellow-600 mt-1">{pending.name}</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleRemoveFile(docType)}
                                            className="mt-2 w-full flex items-center justify-center gap-2"
                                        >
                                            <TrashBinIcon className="w-4 h-4" />
                                            Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                                        <input
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    handleFileSelect(docType, file);
                                                }
                                            }}
                                            className="hidden"
                                            id={`file-upload-${docType}`}
                                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                            disabled={isKycUploading}
                                        />
                                        <label htmlFor={`file-upload-${docType}`} className="cursor-pointer block">
                                            <p className="text-sm text-gray-600">
                                                Click to upload
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG, DOC up to 10MB</p>
                                        </label>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button 
                        type="button" 
                        variant="primary" 
                        onClick={handleSubmitUploads}
                        loading={isKycUploading}
                        disabled={Object.values(pendingFiles).every(f => f === null)}
                    >
                        {isKycUploading ? 'Uploading...' : 'Submit Uploads'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
