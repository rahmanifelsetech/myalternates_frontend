import Select from '@/shared/components/form/Select'
import typographyClasses from '@/shared/utils/typographyUtils'
import React from 'react'
import { useMemo } from 'react'


type HeaderWithAccountSelectorProps = {
    pageTitle: string,
    pageDesc: string,
    accounts: { id: string; modeOfHolding: string; isActive: boolean; }[] | undefined,
    onChange: (value: string) => void,
}
const HeaderWithAccountSelector = ({ pageTitle, pageDesc, accounts, onChange } : HeaderWithAccountSelectorProps) => {
  
    const accountOptions = useMemo(() => {
        if (!accounts) return [];
        return accounts.map((account, index) => ({
            value: account.id,
            label: `${index+1}. ${account.modeOfHolding} ACCOUNT ${account.isActive ? '(Active)' : '(Inactive)'}`
        }));
    }, [accounts])
     
    return (

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
                <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                    {pageTitle}
                </h2>
                <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                    { pageDesc }
                </p>
            </div>
            <div className="flex gap-2">
                <Select
                    options={accountOptions}
                    defaultValue={accountOptions[0]?.value || ''}
                    onChange={(value) => onChange(value)}
                    className={`w-48 ${typographyClasses.body.small} ${typographyClasses.colors.text.primary}`}
                />
            </div>
        </div>
    )
}

export default HeaderWithAccountSelector