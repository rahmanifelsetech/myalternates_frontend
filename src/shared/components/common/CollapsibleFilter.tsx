import React, { useState, ReactNode } from 'react';
import Button from '@shared/components/ui/button/Button';
import { typographyClasses } from '@shared/utils/typographyUtils';

// SVG icons for Filter and Close
const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V19l-4 2v-5.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export interface ActiveFilter {
    id: string;
    label: string;
    onRemove: () => void;
}

interface CollapsibleFilterProps {
    children: ReactNode;
    onApply: () => void;
    onClear: () => void;
    isFilterApplied: boolean;
    searchElement?: ReactNode;
    activeFilters?: ActiveFilter[];
}

export const CollapsibleFilter: React.FC<CollapsibleFilterProps> = ({ 
    children, 
    onApply, 
    onClear, 
    isFilterApplied, 
    searchElement,
    activeFilters 
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleApply = () => {
        onApply();
        setIsOpen(false);
    };

    const handleClear = () => {
        onClear();
        setIsOpen(false);
    };

    const hasActiveFilters = isFilterApplied && activeFilters && activeFilters.length > 0;

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-4">
            <div className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="w-full md:w-auto md:flex-1">
                    {searchElement}
                </div>
                <Button 
                    variant="outline" 
                    onClick={() => setIsOpen(!isOpen)} 
                    startIcon={isOpen ? <CloseIcon /> : <FilterIcon />}
                    className={`whitespace-nowrap ${typographyClasses.component.button}`}
                >
                    {isOpen ? 'Close Filters' : 'Filters'}
                    {(hasActiveFilters || (isFilterApplied && !activeFilters)) && !isOpen && (
                         <span className="ml-2 w-2 h-2 bg-primary-600 rounded-full"></span>
                    )}
                </Button>
            </div>
            
            {hasActiveFilters && (
                <div className="px-4 pb-4 flex flex-wrap gap-2 items-center border-t border-gray-100 pt-3">
                    {activeFilters.map((filter) => (
                        <div 
                            key={filter.id} 
                            className={`inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 ${typographyClasses.component.tag}`}
                        >
                            <span className="mr-2">{filter.label}</span>
                            <button 
                                onClick={(e) => { e.stopPropagation(); filter.onRemove(); }}
                                className="hover:text-blue-900 focus:outline-none p-0.5 rounded-full hover:bg-blue-100 transition-colors"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={handleClear}
                        className={`text-gray-500 hover:text-gray-700 hover:underline ml-2 ${typographyClasses.body.small}`}
                    >
                        Clear All
                    </button>
                </div>
            )}

            {isOpen && (
                <div className="border-t border-gray-200">
                    <div className="p-4">
                        {children}
                    </div>
                    <div className="flex justify-end gap-3 p-4 bg-gray-50 rounded-b-lg border-t border-gray-200">
                        <Button variant="outline" onClick={handleClear} className={typographyClasses.component.button}>Clear</Button>
                        <Button variant="primary" onClick={handleApply} className={typographyClasses.component.button}>Apply</Button>
                    </div>
                </div>
            )}
        </div>
    );
};
