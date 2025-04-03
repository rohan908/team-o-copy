import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NavBar} from "./components/nav-bar.tsx";
import {HomePage} from "./home-page.tsx";
import {MapPage} from "../map-page/map-page.tsx";
import {Display} from "../service-request/submissionDisplay/display.tsx";


export function Routing() {

    // Add more page navigation here

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar />}>
                        <Route index element={<HomePage/>} />
                        <Route path="map-page" element={<MapPage/>} />
                        <Route path="/submission" element={<Display />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}