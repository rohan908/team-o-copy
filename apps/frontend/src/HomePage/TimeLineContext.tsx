import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
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
    setUserStart: (start: string | null) => void;
    userStart: string | null;
    travelMode: google.maps.TravelMode | null; //type travel mode must be googles enum, not just any string
    setTravelMode: (mode: google.maps.TravelMode | null) => void;
    isGmapsLoaded: boolean;
    setIsGmapsLoaded: (loaded: boolean) => void;
    mapRef: {current: google.maps.Map | null};
    directionsRendererRef: {current: google.maps.DirectionsRenderer | null};

    // Indoor Nav
    department: string | null;
    setDepartment: (directoryDestination: string | null) => void;

    directoryOptions: { value: string; label: string }[];
    setDirectoryOptions: (directoryOptions: { value: string; label: string }[]) => void;

    selectedAlgorithm: string | null;
    setSelectedAlgorithm: (algorithm: string | null) => void;

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
    userStart: null,
    setUserStart: () => {},
    travelMode: null,
    setTravelMode: () => {},
    department: '',
    setDepartment: () => {},
    directoryOptions: [],
    setDirectoryOptions: () => {},
    selectedAlgorithm: '',
    setSelectedAlgorithm: () => {},
    selectedService: '',
    setSelectedService: () => {},
    isGmapsLoaded: false,
    setIsGmapsLoaded: () => {},
    mapRef: {current: null},
    directionsRendererRef: {current: null},
});

export function TimelineProvider({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState<number>(0);

    // GMAPS
    const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
    const [userCoordinates, setUserCoordinates] = useState<LocationCoordinates | null>(null);
    const [userStart, setUserStart] = useState<string | null>(null);
    const [travelMode, setTravelMode] = useState<google.maps.TravelMode | null>(null);
    const [isGmapsLoaded, setIsGmapsLoaded] = useState<boolean>(false);
    const mapRef = useRef<google.maps.Map | null>(null);
    const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

    // Indoor Nav
    const [department, setDepartment] = useState<string | null>(null);
    const [directoryOptions, setDirectoryOptions] = useState<{ value: string; label: string }[]>(
        []
    );

    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);

    // Serv Req
    const [selectedService, setSelectedService] = useState<string>('');

    const value = {
        activeSection,
        setActiveSection,
        selectedHospital,
        setSelectedHospital,
        userCoordinates,
        setUserCoordinates,
        userStart,
        setUserStart,
        travelMode,
        setTravelMode,
        department,
        setDepartment,
        directoryOptions,
        setDirectoryOptions,
        selectedAlgorithm,
        setSelectedAlgorithm,
        selectedService,
        setSelectedService,
        isGmapsLoaded,
        setIsGmapsLoaded,
        mapRef,
        directionsRendererRef,
    };

    return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>;
}

export function useTimeline() {
    const context = useContext(TimelineContext);
    return context;
}
