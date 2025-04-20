import React, { createContext, useContext, useState, ReactNode } from 'react';
import {GoogleMap} from "@react-google-maps/api";


// place holder
interface LocationCoordinates {
    lat: number;
    lng: number; //this should be lng not long
}

interface TimelineContextType {
    activeSection: number;
    setActiveSection: (section: number) => void;

    // GMAPS
    selectedHospital: string | undefined;
    setSelectedHospital: (hospital: google.maps.LatLngLiteral | undefined) => void;
    userCoordinates: LocationCoordinates | undefined;
    setUserCoordinates: (coords: LocationCoordinates | undefined) => void;
    travelMode: google.maps.TravelMode | undefined; //type travel mode must be googles enum, not just any string
    setTravelMode: (mode: google.maps.TravelMode | undefined) => void;

    // Indoor Nav
    currDirectoryDestination: string | undefined;
    setCurrDirectoryDestination: (directoryDestination: string | undefined) => void;

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
    currDirectoryDestination: '',
    setCurrDirectoryDestination: () => {},
    selectedService: '',
    setSelectedService: () => {},
});

export function TimelineProvider({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState<number>(0);

    // GMAPS
    const [selectedHospital, setSelectedHospital] = useState<string | undefined>(undefined);
    const [userCoordinates, setUserCoordinates] = useState<LocationCoordinates | undefined>(
        undefined
    );
    const [travelMode, setTravelMode] = useState<google.maps.TravelMode | undefined>(undefined);

    // Indoor Nav
    const [currDirectoryDestination, setCurrDirectoryDestination] = useState<any | undefined>(
        undefined
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
        currDirectoryDestination,
        setCurrDirectoryDestination,
        selectedService,
        setSelectedService,
    };

    return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
}

export function useTimeline() {
    const context = useContext(TimelineContext);
    return context;
}
