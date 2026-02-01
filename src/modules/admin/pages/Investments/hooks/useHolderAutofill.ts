import { useLazyGetInvestorByUniqueIdQuery } from '../../Investors/api/investorApi';
import { useLazyGetHolderByPanQuery } from '../../Investors/api/holderApi';
import { UseFormSetValue } from 'react-hook-form';
import { InvestmentFlowSchemaType } from '../schema/investmentFlowSchema';
import { useState } from 'react';
import { useToast } from '@/shared/hooks/useToast';

export const useHolderAutofill = (setValue: UseFormSetValue<InvestmentFlowSchemaType>) => {
    const [triggerGetInvestorByUniqueId] = useLazyGetInvestorByUniqueIdQuery();
    const [triggerGetHolderByPan] = useLazyGetHolderByPanQuery();
    const [investorId, setInvestorId] = useState<string | null>(null);
    const { success } = useToast();

    const handleInvestorUniqueIdBlur = async (event: React.FocusEvent<HTMLInputElement>, index: number) => {
        const uniqueId = event.target.value;
        if (uniqueId) {
            if (index === 0) {
                // Fetch investor data for Holder 1
                const { data } = await triggerGetInvestorByUniqueId(uniqueId);
                if (data?.data) {
                    success('Investor found and details auto-filled.');
                    // Store investor ID
                    setInvestorId(data.data.id || null);
                    
                    const person = data.data.primaryPerson;
                    const address = person?.addresses?.[0];
                    
                    // Set holder personal information from primaryPerson
                    setValue(`holders.${index}.name`, person?.fullName || '');
                    setValue(`holders.${index}.pan`, data.data.primaryPan || '');
                    setValue(`holders.${index}.dob`, person?.dob || '');
                    setValue(`holders.${index}.gender`, person?.gender || '');
                    setValue(`holders.${index}.mobile`, person?.mobile || '');
                    setValue(`holders.${index}.email`, person?.email || '');

                    // Auto fill address fields
                    setValue(`holders.${index}.address.addressLine1`, address?.address1 || '');
                    setValue(`holders.${index}.address.addressLine2`, address?.address2 || '');
                    setValue(`holders.${index}.address.city`, address?.city || '');
                    setValue(`holders.${index}.address.state`, address?.state || '');
                    setValue(`holders.${index}.address.country`, address?.country || '');
                    setValue(`holders.${index}.address.pincode`, address?.pincode || '');
                    
                    // Set investor-level status
                    setValue('investorResidentialStatus', data.data.residentialStatus || '');
                    setValue('investorSubStatus', data.data.subStatus || '');
                    setValue('investorMyaltCode', data.data.myaltCode || '');
                    
                    // Set is minor flag and guardian info
                    if (person?.isMinor) {
                        setValue(`holders.${index}.isMinor`, true);
                        setValue(`holders.${index}.guardian.fullName`, person?.guardianName || '');
                        setValue(`holders.${index}.guardian.idType`, person?.guardianIdType || '');
                        setValue(`holders.${index}.guardian.idNumber`, person?.guardianIdNumber || '');
                    }
                } else {
                    setInvestorId(null);
                }
            } else {
                // Fetch holder data for other holders
                const { data } = await triggerGetHolderByPan(uniqueId);

                if (data) {
                    const person = data?.data;
                    const address = person?.addresses?.[0];
                    
                    setValue(`holders.${index}.name`, person?.fullName || '');
                    setValue(`holders.${index}.dob`, person?.dob || '');
                    setValue(`holders.${index}.gender`, person?.gender || '');
                    setValue(`holders.${index}.mobile`, person?.mobile || '');
                    setValue(`holders.${index}.email`, person?.email || '');
                    
                    // Auto fill address fields
                    setValue(`holders.${index}.address.addressLine1`, address?.address1 || '');
                    setValue(`holders.${index}.address.addressLine2`, address?.address2 || '');
                    setValue(`holders.${index}.address.city`, address?.city || '');
                    setValue(`holders.${index}.address.state`, address?.state || '');
                    setValue(`holders.${index}.address.country`, address?.country || '');
                    setValue(`holders.${index}.address.pincode`, address?.pincode || '');
                    

                    // Set is minor flag and guardian info
                    if (person?.isMinor) {
                        setValue(`holders.${index}.isMinor`, true);
                        setValue(`holders.${index}.guardian.fullName`, person?.guardianName || '');
                        setValue(`holders.${index}.guardian.idType`, person?.guardianIdType || '');
                        setValue(`holders.${index}.guardian.idNumber`, person?.guardianIdNumber || '');
                        setValue(`holders.${index}.guardian.relationship`, person?.guardianRelationship || '');
                    }
                }
            }
        }
    };

    return {
        handleInvestorUniqueIdBlur,
        investorId,
    };
};
