import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
    currentFilters: string[];
    setFilter: (names: string[]) => void;
    addFilter: (name: string) => void;
    removeFilter: (name: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error('useFilterContext must be used inside FilterProvider');
    return context;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentFilters, setFilter] = useState<string[]>([]);

    // this shit buns
    const addFilter = (name: string) => {
        if (!currentFilters.includes(name.trim())) {
            setFilter((prev) => [...prev, name.trim()]);
        }
    };
    // this shit more buns
    const removeFilter = (name: string) => {
        setFilter((prev) => prev.filter((n) => n !== name));
    };

    return (
        <FilterContext.Provider value={{ currentFilters, setFilter, addFilter, removeFilter }}>
            {children}
        </FilterContext.Provider>
    );
};
