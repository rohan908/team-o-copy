import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
    nameFilters: string[];
    priorityFilters?: string[];
    setNameFilter: (field: string[]) => void;
    addNameFilter: (field: string) => void;
    removeNameFilter: (field: string) => void;
    setPriorityFilter: (field: string[]) => void;
    addPriorityFilter: (field: string) => void;
    removePriorityFilter: (field: string) => void;
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

    // Name Filtering Logic
    const [nameFilters, setNameFilter] = useState<string[]>([]);

    // adding a name filter to the list
    const addNameFilter = (name: string) => {
        if (!nameFilters.includes(name.trim())) {
            setNameFilter((prev) => [...prev, name.trim()]);
        }
    };
    // removing a name filter
    const removeNameFilter = (name: string) => {
        setNameFilter((prev) => prev.filter((n) => n !== name));
    };

    // Priority Filtering Logic
    const [priorityFilters, setPriorityFilter] = useState<string[]>([]);
    // adding a priority filter to the list
    const addPriorityFilter = (priority: string) => {
        if (!priorityFilters.includes(priority.trim())) {
            setPriorityFilter((prev) => [...prev, priority.trim()]);
        }
    };
    // removeing a priority filter to the list
    const removePriorityFilter = (priority: string) => {
        setPriorityFilter((prev) => prev.filter((n) => n !== priority));
    };

    return (
        <FilterContext.Provider
            value={{
                nameFilters,
                setNameFilter,
                addNameFilter,
                removeNameFilter,
                priorityFilters,
                setPriorityFilter,
                addPriorityFilter,
                removePriorityFilter,
                opened,
                setOpened,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
