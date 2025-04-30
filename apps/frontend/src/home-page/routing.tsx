import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/nav-bar.tsx';
import { MapPage } from '../MapPage/MapPage.tsx';
import { MapAPIPage } from '../MapsAPIPage/MapAPIPage.tsx';
import { ServiceRequestPage } from '../service-request/ServiceRequestPage.tsx';
import { useState } from 'react';
import { HomePage } from '../HomePage/HomePage.tsx';
import { LogInPage } from './log-in-page.tsx';
import { MapEditor } from '../IndoorMapPage/MapEditor.tsx';
import NotFound from '../404Page.tsx';
import { TimelineProvider } from '../HomePage/TimeLineContext';
import ProtectedRoute from './components/ProtectedRoute';
import { IndoorMapsPage } from '../IndoorMapPage/IndoorMapsPage.tsx';
import CreditPage from '../CreditPage/CreditPage.tsx';
import AboutPage from '../AboutPage/Aboutpage.tsx';
import CombinedPage from '../CreditPage/InfoPage.tsx';
import AdminPage from '../AdminPage/AdminPage.tsx';

// cursed prop passing to get department and hospital data from the MapAPIPage to the draggable map
// TODO: switch this to a useContext once the router is less bad or pass information through the url

export function Routing() {
    const [setSelectedHospitalName] = useState<string | null>(null);
    const [setSelectedDepartment] = useState<string | null>(null);

    return (
        <>
            <TimelineProvider>
                <Routes>
                    <Route path="/" element={<NavBar />}>
                        <Route index element={<HomePage />} />
                        <Route path="log-in-page" element={<LogInPage />} />
                        <Route path="map-page" element={<MapPage />} />
                        <Route path="About-page" element={<AboutPage />} />
                        <Route
                            path="map-API"
                            element={
                                <MapAPIPage
                                    onSelectHospital={setSelectedHospitalName}
                                    onDepartmentSelect={setSelectedDepartment}
                                />
                            }
                        />
                        <Route path="/*" element={<NotFound />} />

                        <Route path="/IndoorMapPage" element={<IndoorMapsPage />} />

                        <Route
                            path="/map-editor"
                            element={<ProtectedRoute Route={<MapEditor />} />}
                        />
                        <Route
                            path="/admin-page"
                            element={<ProtectedRoute Route={<AdminPage />} />}
                        />
                        <Route path="/HomePage/HomePage" element={<HomePage />} />
                        <Route path="/Info-page" element={<CombinedPage />} />
                    </Route>
                </Routes>
            </TimelineProvider>
        </>
    );
}
