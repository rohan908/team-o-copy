import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GoogleMap } from '@react-google-maps/api';

// place holder
interface LocationCoordinates {
    lat: number;
    lng: number;
}

interface TimelineContextType {
    activeSection: number;
    setActiveSection: (section: number) => void;

    // GMAPS
    selectedHospital: string | null;
    setSelectedHospital: (hospital: string | null) => void;
    userCoordinates: LocationCoordinates | null;
    setUserCoordinates: (coords: LocationCoordinates | null) => void;
    travelMode: google.maps.TravelMode | null; //type travel mode must be googles enum, not just any string
    setTravelMode: (mode: google.maps.TravelMode | null) => void;
    isGmapsLoaded: boolean;
    setIsGmapsLoaded: (loaded: boolean) => void;


    // Indoor Nav
    department: string | null;
    setDepartment: (directoryDestination: string | null) => void;

    directoryOptions: { value: string; label: string }[];
    setDirectoryOptions: (directoryOptions: { value: string; label: string }[]) => void;

    // Serv Req
    selectedService: string;
    setSelectedService: (service: string) => void;
}

// Create the context with default values
const TimelineContext = createContext<TimelineContextType>({
    activeSection: 0,
    setActiveSection: () => {},
    selectedHospital: null,
    setSelectedHospital: () => {},
    userCoordinates: null,
    setUserCoordinates: () => {},
    travelMode: null,
    setTravelMode: () => {},
    department: '',
    setDepartment: () => {},
    directoryOptions: [],
    setDirectoryOptions: () => {},
    selectedService: '',
    setSelectedService: () => {},
    isGmapsLoaded: false,
    setIsGmapsLoaded: () => {},
});

export function TimelineProvider({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState<number>(0);

    // GMAPS
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [userCoordinates, setUserCoordinates] = useState<LocationCoordinates | null>(null);
    const [travelMode, setTravelMode] = useState<google.maps.TravelMode | null>(null);
    const [isGmapsLoaded, setIsGmapsLoaded] = useState<boolean>(false);

    // Indoor Nav
    const [department, setDepartment] = useState<string | null>(null);
    const [directoryOptions, setDirectoryOptions] = useState<{ value: string; label: string }[]>(
        []
    );

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
        department,
        setDepartment,
        directoryOptions,
        setDirectoryOptions,
        selectedService,
        setSelectedService,
        isGmapsLoaded,
        setIsGmapsLoaded,
    };

    return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
}

export function useTimeline() {
    const context = useContext(TimelineContext);
    return context;
}
