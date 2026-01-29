import React, { useEffect, useState } from 'react';
import { useForm } from '@shared/hooks/useForm';
import { AmcSchema, AmcSchemaType } from '../schema/amcSchema';
import { Amc } from '../types/amc';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import ComponentCard from '@shared/components/common/ComponentCard';
import { setFormErrors } from '@/shared/utils/formUtils';
import { useGetProductListQuery } from '../../Schemes/api/schemeApi';
import { ApiError } from '@/shared/types/api';
import { formatDate } from '@/shared/utils/dateUtils';

interface AmcFormProps {
    amc?: Amc | null;
    onSubmit: (data: AmcSchemaType) => Promise<any>;
    isLoading: boolean;
}

const emptyValues: AmcSchemaType = {
    productId: '',
    amcCode: '',
    name: '',
    shortName: '',
    logo: undefined,
    about: '',
    inceptionDate: undefined,
    sebiRegistrationNo: '',
    commonInvestmentPhilosophy: '',
    noOfStrategies: 0,
    investmentTeam: '',
    investorLoginUrl: '',
    address: '',
    websiteUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    creative: undefined,
    googleMapLink: '',
    restrictDisplay: false,
    isFeatured: false,
    priorityOrder: 0,
};


export const AmcForm: React.FC<AmcFormProps> = ({ amc, onSubmit, isLoading }) => {
    const [filesToRemove, setFilesToRemove] = useState<string[]>([]);

    const {
        control,
        handleSubmit,
        reset,
        setError,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm(AmcSchema,{ defaultValues: amc ? {
        ...amc,
        productId: amc.productId ?? undefined,
        amcCode: amc.amcCode ?? '',
        name: amc.name ?? '',
        shortName: amc.shortName ?? '',
        logo: amc.logoUrl ?? undefined,
        about: amc.about ?? '',
        inceptionDate: amc.inceptionDate ?? undefined,
        sebiRegistrationNo: amc.sebiRegistrationNo ?? '',
        commonInvestmentPhilosophy: amc.commonInvestmentPhilosophy ?? '',
        noOfStrategies: amc.noOfStrategies ?? 0,
        investmentTeam: amc.investmentTeam ?? '',
        investorLoginUrl: amc.investorLoginUrl ?? '',
        address: amc.address ?? '',
        websiteUrl: amc.websiteUrl ?? '',
        twitterUrl: amc.twitterUrl ?? '',
        facebookUrl: amc.facebookUrl ?? '',
        linkedinUrl: amc.linkedinUrl ?? '',
        youtubeUrl: amc.youtubeUrl ?? '',
        creative: amc.creativeUrl ?? undefined,
        googleMapLink: amc.googleMapLink ?? '',
    } : emptyValues});

    useEffect(() => {
        if (amc) {
            reset({
                ...amc,
                productId: amc.productId ?? undefined,
                amcCode: amc.amcCode ?? '',
                name: amc.name ?? '',
                shortName: amc.shortName ?? '',
                logo: amc.logoUrl ?? undefined,
                about: amc.about ?? '',
                inceptionDate: amc.inceptionDate ? formatDate(amc.inceptionDate) : undefined,
                sebiRegistrationNo: amc.sebiRegistrationNo ?? '',
                commonInvestmentPhilosophy: amc.commonInvestmentPhilosophy ?? '',
                noOfStrategies: amc.noOfStrategies ?? 0,
                investmentTeam: amc.investmentTeam ?? '',
                investorLoginUrl: amc.investorLoginUrl ?? '',
                address: amc.address ?? '',
                websiteUrl: amc.websiteUrl ?? '',
                twitterUrl: amc.twitterUrl ?? '',
                facebookUrl: amc.facebookUrl ?? '',
                linkedinUrl: amc.linkedinUrl ?? '',
                youtubeUrl: amc.youtubeUrl ?? '',
                creative: amc.creativeUrl ?? undefined,
                googleMapLink: amc.googleMapLink ?? '',
            });
        }
    }, [amc, reset]);

    const handleFormSubmit = async (data: AmcSchemaType) => {
        try {
            await onSubmit({ ...data, filesToRemove } as any);
        } catch (error: any) {
            console.error('Submission error:', error);
            setFormErrors(error, setError);
        }
    };

    const { data: productList } = useGetProductListQuery();
    const productOptions = productList?.data?.map((product: any) => ({ label: product.name, value: product.id })) || [];

    return (
        <ComponentCard>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DynamicFormField
                        control={control}
                        label="Product"
                        type="select"
                        options={productOptions}
                        error={errors.productId}
                        {...register('productId')}
                    />
                    <DynamicFormField type="text" control={control} label="AMC Code" error={errors.amcCode} {...register('amcCode')} />
                    <DynamicFormField control={control} label="AMC Name" error={errors.name} {...register('name')} />
                    <DynamicFormField control={control} label="Short Name" error={errors.shortName} {...register('shortName')} />
                    <DynamicFormField
                        control={control}
                        name="logo"
                        label="AMC Logo"
                        type="file"
                        error={errors.logoUrl}
                        imageUrl={amc?.logoUrl}
                        onRemove={() => setFilesToRemove((prev) => [...prev, 'logoUrl'])}
                    />
                    <DynamicFormField control={control} label="About AMC" type="textarea" error={errors.about} {...register('about')} />
                    <DynamicFormField
                        control={control}
                        name="inceptionDate"
                        label="Inception Date"
                        type="date-picker"
                        error={errors.inceptionDate}
                        setValue={setValue}
                        value={watch('inceptionDate')}
                    />
                    <DynamicFormField control={control} label="SEBI Registration No" error={errors.sebiRegistrationNo} {...register('sebiRegistrationNo')} />
                    <DynamicFormField control={control} label="No. of Strategies" type="number" error={errors.noOfStrategies} {...register('noOfStrategies')} />
                    <DynamicFormField control={control} label="Common Investment Philosophy" type="textarea" error={errors.commonInvestmentPhilosophy} {...register('commonInvestmentPhilosophy')} />
                    <DynamicFormField control={control} label="Investment Team" type="textarea" error={errors.investmentTeam} {...register('investmentTeam')} />
                    <DynamicFormField control={control} label="Investor Login URL" error={errors.investorLoginUrl} {...register('investorLoginUrl')} />
                    <DynamicFormField control={control} label="Address" error={errors.address} {...register('address')} />
                    <DynamicFormField control={control} label="Website URL" error={errors.websiteUrl} {...register('websiteUrl')} />
                    <DynamicFormField control={control} label="Twitter URL" error={errors.twitterUrl} {...register('twitterUrl')} />
                    <DynamicFormField control={control} label="Facebook URL" error={errors.facebookUrl} {...register('facebookUrl')} />
                    <DynamicFormField control={control} label="LinkedIn URL" error={errors.linkedinUrl} {...register('linkedinUrl')} />
                    <DynamicFormField control={control} label="YouTube URL" error={errors.youtubeUrl} {...register('youtubeUrl')} />
                    <DynamicFormField
                        control={control}
                        name="creative"
                        label="AMC Creative"
                        type="file"
                        error={errors.creativeUrl}
                        imageUrl={amc?.creativeUrl}
                        onRemove={() => setFilesToRemove((prev) => [...prev, 'creativeUrl'])}
                    />
                    <DynamicFormField control={control} label="Google Map Link" error={errors.googleMapLink} {...register('googleMapLink')} />
                    <DynamicFormField control={control} label="Priority Order" type="number" error={errors.priorityOrder} {...register('priorityOrder')} />
                    <DynamicFormField control={control} name="restrictDisplay" label="Restrict Display" type="checkbox" error={errors.restrictDisplay} />
                    <DynamicFormField control={control} name="isFeatured" label="Is Featured" type="checkbox" error={errors.isFeatured} />
                </div>
                <div className="flex justify-end mt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </Form>
        </ComponentCard>
    );
};