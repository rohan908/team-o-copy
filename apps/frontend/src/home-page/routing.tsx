import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/nav-bar.tsx';
import { HomePage } from './home-page.tsx';
import { MapPage } from '../MapPage/MapPage.tsx';
import { Directory } from '../directory/directory.tsx';
import { DirectoryLocation } from '../directory/components/DirectoryLocation.tsx';
import { Display } from '../service-request/Display.tsx';
import { AdminPage } from '../AdminPage/AdminPage.tsx';
import { MapAPIPage } from '../MapsAPIPage/MapAPIPage.tsx';
import { NodeDirectory } from '../NodeDirectoryPage/NodeDirectory.tsx';
//import { Language } from '../service-request/service';
import { BSFMapPage } from '../BFSMapPages-OLD/components/BSFMapPage.tsx';

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LanguageRequestHistory from '../AdminPage/LanguageRequestHistory.tsx';
import { DraggableMap } from '../IndoorMapPage/DraggableMap.tsx';

export function Routing() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar />}>
                        <Route index element={<HomePage />} />
                        <Route path="map-page" element={<MapPage />} />
                        <Route path="map-API" element={<MapAPIPage />} />
                        <Route path="/submission" element={<Display />} />
                        <Route path="directory" element={<Directory />} />
                        <Route path="/NodeDirectory" element={<NodeDirectory />} />
                        <Route path="/directory/:topic" element={<DirectoryLocation />} />
                        <Route path="/IndoorMapPage" element={<DraggableMap />} />
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
