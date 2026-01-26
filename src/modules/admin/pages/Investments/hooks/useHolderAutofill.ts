import { useLazyGetInvestorByPanQuery } from '../../Investors/api/investorApi';
import { useLazyGetHolderByPanQuery } from '../../Investors/api/holderApi';
import { UseFormSetValue } from 'react-hook-form';
import { InvestmentFlowSchemaType } from '../schema/investmentFlowSchema';

export const useHolderAutofill = (setValue: UseFormSetValue<InvestmentFlowSchemaType>) => {
    const [triggerGetInvestorByPan] = useLazyGetInvestorByPanQuery();
    const [triggerGetHolderByPan] = useLazyGetHolderByPanQuery();

    const handlePanBlur = async (event: React.FocusEvent<HTMLInputElement>, index: number) => {
        const pan = event.target.value;
        if (pan) {
            if (index === 0) {
                // Fetch investor data for Holder 1
                const { data } = await triggerGetInvestorByPan(pan);
                if (data?.data) {
                    setValue(`holders.${index}.name.value`, data.data.name || '');
                    setValue(`holders.${index}.pan.value`, data.data.pan || '');
                    setValue(`holders.${index}.dob.value`, data.data.dateOfBirth || '');
                    setValue(`holders.${index}.gender.value`, data.data.gender || '');
                    setValue(`holders.${index}.mobile.value`, data.data.mobile || '');
                    setValue(`holders.${index}.email.value`, data.data.email || '');
                    setValue('investorResidentialStatus.value', data.data.residentialStatus || '');
                    setValue('investorSubStatus.value', data.data.subStatus || '');
                    
                    setValue(`holders.${index}.address.addressLine1.value`, data.data.address1 || '');
                    setValue(`holders.${index}.address.addressLine2.value`, data.data.address2 || '');
                    setValue(`holders.${index}.address.city.value`, data.data.city || '');
                    setValue(`holders.${index}.address.state.value`, data.data.state || '');
                    setValue(`holders.${index}.address.country.value`, data.data.country || '');
                    setValue(`holders.${index}.address.pincode.value`, data.data.pincode || '');
                }
            } else {
                // Fetch holder data for other holders
                const { data } = await triggerGetHolderByPan(pan);
                if (data?.data) {
                    setValue(`holders.${index}.name.value`, data.data.name || '');
                    setValue(`holders.${index}.dob.value`, data.data.dateOfBirth || '');
                    setValue(`holders.${index}.gender.value`, data.data.gender || '');
                    setValue(`holders.${index}.mobile.value`, data.data.mobile || '');
                    setValue(`holders.${index}.email.value`, data.data.email || '');
                    
                    if (data.data.address1) {
                        setValue(`holders.${index}.address.addressLine1.value`, data.data.address1 || '');
                        setValue(`holders.${index}.address.addressLine2.value`, data.data.address2 || '');
                        setValue(`holders.${index}.address.city.value`, data.data.city || '');
                        setValue(`holders.${index}.address.state.value`, data.data.state || '');
                        setValue(`holders.${index}.address.country.value`, data.data.country || '');
                        setValue(`holders.${index}.address.pincode.value`, data.data.pincode || '');
                    }
                }
            }
        }
    };

    return {
        handlePanBlur,
    };
};
