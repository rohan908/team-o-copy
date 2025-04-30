import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AlgorithmContextType {
    // currently used algo
    algorithm: string;
    // updater for algo
    setAlgorithm: (algo: string) => void;
}

const AlgorithmContext = createContext<AlgorithmContextType | undefined>(undefined);

export const AlgorithmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [algorithm, setAlgorithm] = useState<string>('BFS');

    return (
        <AlgorithmContext.Provider value={{ algorithm, setAlgorithm }}>
            {children}
        </AlgorithmContext.Provider>
    );
};

export function useAlgorithmContext(): AlgorithmContextType {
    const context = useContext(AlgorithmContext);
    if (!context) {
        throw new Error('useAlgorithmContext must be used within an AlgorithmProvider');
    }
    return context;
}
