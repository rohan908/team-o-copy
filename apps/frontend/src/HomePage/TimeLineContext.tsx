import React, { createContext, useContext, useState, ReactNode } from 'react';

// place holder
interface LocationCoordinates {
    lat: number;
    long: number;
}

interface TimelineContextType {
    activeSection: number;
    setActiveSection: (section: number) => void;
    
    // GMAPS
    selectedHospital: any | undefined; // using any here for L.LatLng to avoid dependency issues
    setSelectedHospital: (hospital: any | undefined) => void;
    userCoordinates: LocationCoordinates | undefined;
    setUserCoordinates: (coords: LocationCoordinates | undefined) => void;
    travelMode: string | undefined;
    setTravelMode: (mode: string | undefined) => void;
    
    // Indoor Nav
    startNodeId: string;
    setStartNodeId: (id: string) => void;
    endNodeId: string;
    setEndNodeId: (id: string) => void;
    selectedFloor: number;
    setSelectedFloor: (floor: number) => void;
    
    // Serv Req
    selectedService: string;
    setSelectedService: (service: string) => void;
}

// Create the context with default values
const TimelineContext = createContext<TimelineContextType>({
    activeSection: 0,
    setActiveSection: () => {},
    selectedHospital: undefined,
    setSelectedHospital: () => {},
    userCoordinates: undefined,
    setUserCoordinates: () => {},
    travelMode: undefined,
    setTravelMode: () => {},
    startNodeId: '',
    setStartNodeId: () => {},
    endNodeId: '',
    setEndNodeId: () => {},
    selectedFloor: 1,
    setSelectedFloor: () => {},
    selectedService: '',
    setSelectedService: () => {},
});

export function TimelineProvider({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState<number>(0);
    
    // GMAPS
    const [selectedHospital, setSelectedHospital] = useState<any | undefined>(undefined);
    const [userCoordinates, setUserCoordinates] = useState<LocationCoordinates | undefined>(undefined);
    const [travelMode, setTravelMode] = useState<string | undefined>(undefined);
    
    // Indoor Nav
    const [startNodeId, setStartNodeId] = useState<string>('');
    const [endNodeId, setEndNodeId] = useState<string>('');
    const [selectedFloor, setSelectedFloor] = useState<number>(1);
    
    // Serv Req
    const [selectedService, setSelectedService] = useState<string>('');

    const value = {
        activeSection,
        setActiveSection,
        selectedHospital,
        setSelectedHospital,
        userCoordinates,
        setUserCoordinates,
        travelMode,
        setTravelMode,
        startNodeId,
        setStartNodeId,
        endNodeId,
        setEndNodeId,
        selectedFloor,
        setSelectedFloor,
        selectedService,
        setSelectedService,
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