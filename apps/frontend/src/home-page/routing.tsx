import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NavBar} from "./components/nav-bar.tsx";
import {HomePage} from "./home-page.tsx";
import {MapPage} from "../map-page/map-page.tsx";

export function Routing() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar/>}>
                        <Route index element={<HomePage/>} />
                        <Route path="map-page" element={<MapPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}