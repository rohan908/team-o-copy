import React, { createContext, useContext, useState } from 'react';

interface Filters {
    department?: string[];
    hospital?: string[];
    priority?: string[];
    status?: string[];
    language?: string[];
    employeeName?: string[];
}

interface FilterContextType {
    filters: Filters;
    addFilter: (item: keyof Filters, value: string) => void;
    removeFilter: (key: keyof Filters, value: string) => void;
    clearFilters: () => void;

    // nameFilters: string[];
    // setNameFilter: (field: string[]) => void;
    // addNameFilter: (field: string) => void;
    //removeNameFilter: (field: string) => void;
    // priorityFilters: string[];
    // setPriorityFilter: (field: string[]) => void;
    // addPriorityFilter: (field: string) => void;
    // removePriorityFilter: (field: string) => void;
    // statusFilters: string[];
    // setStatusFilter: (field: string[]) => void;
    // addStatusFilter: (field: string) => void;
    // removeStatusFilter: (field: string) => void;
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

    // // Name Filtering Logic
    // const [nameFilters, setNameFilter] = useState<string[]>([]);
    //
    // // adding a name filter to the list
    // const addNameFilter = (name: string) => {
    //     if (!nameFilters.includes(name.trim())) {
    //         setNameFilter((prev) => [...prev, name.trim()]);
    //     }
    // };
    // // removing a name filter
    // const removeNameFilter = (name: string) => {
    //     setFilters((prev) => prev.employeeName((n) => n !== name));
    // };
    //
    // // Priority Filtering Logic
    // const [priorityFilters, setPriorityFilter] = useState<string[]>([]);
    // // adding a priority filter to the list
    // const addPriorityFilter = (priority: string) => {
    //     if (!priorityFilters.includes(priority.trim())) {
    //         setPriorityFilter((prev) => [...prev, priority.trim()]);
    //     }
    // };
    // // removeing a priority filter to the list
    // const removePriorityFilter = (priority: string) => {
    //     setPriorityFilter((prev) => prev.filter((n) => n !== priority));
    // };
    //
    // // Status Filtering Logic
    // const [statusFilters, setStatusFilter] = useState<string[]>([]);
    // // adding a priority filter to the list
    // const addStatusFilter = (status: string) => {
    //     if (!statusFilters.includes(status.trim())) {
    //         setStatusFilter((prev) => [...prev, status.trim()]);
    //     }
    // };
    // // removeing a priority filter to the list
    // const removeStatusFilter = (status: string) => {
    //     setStatusFilter((prev) => prev.filter((n) => n !== status));
    // };

    return (
        <FilterContext.Provider
            value={{ filters, addFilter, removeFilter, clearFilters, opened, setOpened }}
        >
            {children}
        </FilterContext.Provider>
    );
};
