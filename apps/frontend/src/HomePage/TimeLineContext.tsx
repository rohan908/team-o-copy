import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TimelineContextType {
    activeSection: number;
    setActiveSection: (section: number) => void;

}

const TimelineContext = createContext<TimelineContextType> ({
    activeSection: 0,
    setActiveSection: () => {},
});

export function TimelineProvider({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState<number>(0);

    const value = {
        activeSection,
        setActiveSection,
    };

    return (
        <TimelineContext.Provider value={value}>
            {children}
        </TimelineContext.Provider>
    );
}

export function useTimeline() {
    const context = useContext(TimelineContext);
    return context;
}