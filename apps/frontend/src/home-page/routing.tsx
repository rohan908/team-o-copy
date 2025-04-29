import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/nav-bar.tsx';
import { MapPage } from '../MapPage/MapPage.tsx';
import { Directory } from '../directory/directory.tsx';
import { DirectoryLocation } from '../directory/components/DirectoryLocation.tsx';
import { MapAPIPage } from '../MapsAPIPage/MapAPIPage.tsx';
import Language from '../service-request/LanguageInterpreterSR.tsx';
import { ServiceRequestPage } from '../service-request/ServiceRequestPage.tsx';
import Maintenance from '../service-request/MaintenanceSR.tsx';
import { useState } from 'react';
import LanguageRequestHistory from '../AdminPage/LanguageRequestHistory.tsx';
import { HomePage } from '../HomePage/HomePage.tsx';
import { LogInPage } from './log-in-page.tsx';
import { MapEditor } from '../IndoorMapPage/MapEditor.tsx';
import Sanitation from '../service-request/SanitationSR.tsx';
import NotFound from '../404Page.tsx';
import Security from '../service-request/SecuritySR.tsx';
import AdminPageV2 from '../AdminPage/AdminPageNewUI.tsx';
import { TimelineProvider } from '../HomePage/TimeLineContext';
import ProtectedRoute from './components/ProtectedRoute';
import { IndoorMapsPage } from '../IndoorMapPage/IndoorMapsPage.tsx';
import CreditPage from '../CreditPage/CreditPage.tsx';
import AboutPage from '../AboutPage/Aboutpage.tsx';


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

                        <Route path="directory" element={<Directory />} />
                        <Route path="/directory/:topic" element={<DirectoryLocation />} />
                        <Route
                            path="/service-request-page"
                            element={<ProtectedRoute Route={<ServiceRequestPage />} />}
                        />
                        <Route
                            path="/language-form"
                            element={<ProtectedRoute Route={<Language />} />}
                        />
                        <Route
                            path="/sanitation-form"
                            element={<ProtectedRoute Route={<Sanitation />} />}
                        />
                        <Route
                            path="/maintenance-form"
                            element={<ProtectedRoute Route={<Maintenance />} />}
                        />
                        <Route
                            path="/security-form"
                            element={<ProtectedRoute Route={<Security />} />}
                        />
                        <Route path="/*" element={<NotFound />} />

                        <Route path="/IndoorMapPage" element={<IndoorMapsPage />} />

                            <Route
                                path="/map-editor"
                                element={<ProtectedRoute Route={<MapEditor />} />}
                            />
                            <Route
                                path="/admin-page"
                                element={<ProtectedRoute Route={<AdminPageV2 />} />}
                            />
                            <Route path="/HomePage/HomePage" element={<HomePage />} />
                            <Route
                                path="/language-request-history"
                                element={<ProtectedRoute Route={<LanguageRequestHistory />} />}
                            />
                            <Route path="/Credit-page" element={<CreditPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </TimelineProvider>
        </>
    );
}
