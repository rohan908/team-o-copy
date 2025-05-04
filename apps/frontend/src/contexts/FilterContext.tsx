import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
    filterNames: string[];
    setFilterNames: (names: string[]) => void;
    addName: (name: string) => void;
    removeName: (name: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error('useFilterContext must be used inside FilterProvider');
    return context;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filterNames, setFilterNames] = useState<string[]>([]);

    const addName = (name: string) => {
        if (!filterNames.includes(name.trim())) {
            setFilterNames((prev) => [...prev, name.trim()]);
        }
    };
    const removeName = (name: string) => {
        setFilterNames((prev) => prev.filter((n) => n !== name));
    };

    return (
        <FilterContext.Provider value={{ filterNames, setFilterNames, addName, removeName }}>
            {children}
        </FilterContext.Provider>
    );
};
