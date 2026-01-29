import React from 'react';
import { UseFormSetValue, UseFormWatch, FieldArrayWithId } from 'react-hook-form';
import Button from '@/shared/components/ui/button/Button';
import { TrashBinIcon } from '@/shared/icons';
import { InvestmentFlowSchemaType } from '../../schema/investmentFlowSchema';

interface KycStepProps {
    handleOpenKycModal: (holderIndex: number) => void;
    holderFields: FieldArrayWithId<InvestmentFlowSchemaType, "holders", "id">[];
    watch: UseFormWatch<InvestmentFlowSchemaType>;
    uploadedDocs: any;
    setUploadedDocs: React.Dispatch<React.SetStateAction<any>>;
    setValue: UseFormSetValue<InvestmentFlowSchemaType>;
}

export const KycStep: React.FC<KycStepProps> = ({
    handleOpenKycModal,
    holderFields,
    watch,
    uploadedDocs,
    setUploadedDocs,
    setValue,
}) => {
    return (
        <div>
            {/* Display uploaded documents summary */}
            <div className="space-y-4">
                {holderFields.map((field, holderIndex) => {
                    const holderName = watch(`holders.${holderIndex}.name`);
                    const holderPan = watch(`holders.${holderIndex}.pan`);
                    
                    // Get documents uploaded for this holder
                    const holderDocs = uploadedDocs[holderIndex] ? Object.entries(uploadedDocs[holderIndex]) : [];

                    return (
                        <div key={field.id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-semibold">
                                    Holder {holderIndex + 1}: {holderName || 'Unnamed'} {holderPan && `(${holderPan})`}
                                </h4>
                                <Button 
                                    type="button"
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleOpenKycModal(holderIndex)}
                                >
                                    Upload Documents
                                </Button>
                            </div>
                            
                            {holderDocs.length > 0 ? (
                                <div className="space-y-2">
                                    {holderDocs.map(([docType, doc]: [string, any]) => (
                                        <div key={docType} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                                            <div className="flex items-center gap-3">
                                                <span className="text-green-600">✓</span>
                                                <div>
                                                    <p className="text-sm font-medium capitalize">
                                                        {docType === 'pan' && 'PAN Document'}
                                                        {docType === 'addressProof' && 'Address Proof'}
                                                        {docType === 'bankProof' && 'Bank Proof'}
                                                        {docType === 'others' && 'Other Documents'}
                                                    </p>
                                                    <p className="text-xs text-gray-600">{doc.fileName}</p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setUploadedDocs((prev: any) => {
                                                        const newDocs = { ...prev };
                                                        if (newDocs[holderIndex]) {
                                                            const newHolderDocs = { ...newDocs[holderIndex] };
                                                            delete newHolderDocs[docType];
                                                            newDocs[holderIndex] = newHolderDocs;
                                                        }
                                                        return newDocs;
                                                    });
                                                }}
                                            >
                                                <TrashBinIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 italic">No documents uploaded</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
