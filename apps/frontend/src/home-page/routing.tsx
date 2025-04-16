import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/nav-bar.tsx';
import { HomePage } from './home-page.tsx';
import { MapPage } from '../MapPage/MapPage.tsx';
import { Directory } from '../directory/directory.tsx';
import { DirectoryLocation } from '../directory/components/DirectoryLocation.tsx';
import { Display } from '../service-request/Display.tsx';
import { AdminPage } from '../AdminPage/AdminPage.tsx';
import { MapAPIPage } from '../MapsAPIPage/MapAPIPage.tsx';
import Language from '../service-request/LanguageInterpreterSR.tsx';
import { BSFMapPage } from '../BFSMapPages-OLD/components/BSFMapPage.tsx';
import { ServiceRequestPage } from '../service-request/ServiceRequestPage.tsx';
import Maintenance from '../service-request/MaintenanceForm.tsx'
import { useState } from 'react';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LanguageRequestHistory from '../AdminPage/LanguageRequestHistory.tsx';
import { DraggableMap } from '../IndoorMapPage/DraggableMap.tsx';
import { NodeDirectory } from '../NodeDirectoryPage/NodeDirectory.tsx';
import Sanitation from '../service-request/SanitationSR.tsx';

// cursed prop passing to get department and hospital data from the MapAPIPage to the draggable map
// TODO: switch this to a useContext once the router is less bad or pass information through the url

export function Routing() {
    const [opened, { toggle }] = useDisclosure();
    const [selectedHospitalName, setSelectedHospitalName] = useState<string | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar />}>
                        <Route index element={<HomePage />} />
                        <Route path="map-page" element={<MapPage />} />
                        <Route
                            path="map-API"
                            element={
                                <MapAPIPage
                                    onSelectHospital={setSelectedHospitalName}
                                    onDepartmentSelect={setSelectedDepartment}
                                />
                            }
                        />
                        <Route path="/submission" element={<Display />} />
                        <Route path="directory" element={<Directory />} />
                        <Route path="/directory/:topic" element={<DirectoryLocation />} />
                        <Route path="/IndoorMapPage" element={<DraggableMap />} />
                        <Route path="/service-request-page" element={<ServiceRequestPage />} />
                        <Route path="/language-form" element={<Language />} />
                      <Route path="/sanitation-form" element={<Sanitation />} />
                        <Route path="/maintenance-form" element={<Maintenance/>} />
                        <Route
                            path="/IndoorMapPage"
                            element={
                                <DraggableMap
                                    selectedHospitalName={selectedHospitalName}
                                    selectedDepartment={selectedDepartment}
                                />
                            }
                        />
                        <Route path="/admin-page" element={<AdminPage />} />
                        <Route
                            path="/language-request-history"
                            element={<LanguageRequestHistory />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
