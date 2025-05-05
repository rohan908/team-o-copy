import React, { createContext, useContext, useState } from 'react';

interface Filters {
    employeeName?: string[];
    department?: string[];
    hospital?: string[];
    priority?: string[];
    status?: string[];
    language?: string[];
    cleanupType?: string[];
    maintenanceType?: string[];
    security?: string[];
}

interface FilterContextType {
    filters: Filters;
    addFilter: (item: keyof Filters, value: string) => void;
    removeFilter: (key: keyof Filters, value: string) => void;
    clearFilters: () => void;
    allFilters: string[];
    opened: boolean;
    setOpened: (opened: boolean) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error('useFilterContext must be used inside FilterProvider');
    return context;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Handing the popup open state
    const [opened, setOpened] = React.useState(false);

    const [filters, setFilters] = useState<Filters>({});
    const setFilter = (key: keyof Filters, values: string[]) => {
        setFilters((prev) => ({ ...prev, [key]: values }));
    };

    const addFilter = (key: keyof Filters, value: string) => {
        setFilters((prev) => {
            const existing = prev[key] || [];
            if (existing.includes(value)) return prev;
            return { ...prev, [key]: [...existing, value] };
        });
    };

    const removeFilter = (key: keyof Filters, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: (prev[key] || []).filter((v) => v !== value),
        }));
    };

    const clearFilters = () => setFilters({});

    const allFilters = [
        ...(filters.employeeName || []),
        ...(filters.priority || []),
        ...(filters.status || []),
        ...(filters.department || []),
        ...(filters.hospital || []),
        ...(filters.language || []),
        ...(filters.cleanupType || []),
        ...(filters.maintenanceType || []),
        ...(filters.security || []),
    ];
    return (
        <FilterContext.Provider
            value={{
                filters,
                addFilter,
                removeFilter,
                clearFilters,
                allFilters,
                opened,
                setOpened,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
