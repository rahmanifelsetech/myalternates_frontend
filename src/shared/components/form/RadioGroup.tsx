import React from 'react';
import { Controller } from 'react-hook-form';

interface RadioOption {
    label: string;
    value: string;
}

interface RadioGroupProps {
    name: string;
    label: string;
    options: RadioOption[];
    control: any;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, label, options, control }) => {
    return (
        <div>
            <label>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div>
                        {options.map((option) => (
                            <label key={option.value}>
                                <input
                                    type="radio"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                )}
            />
        </div>
    );
};

export default RadioGroup;