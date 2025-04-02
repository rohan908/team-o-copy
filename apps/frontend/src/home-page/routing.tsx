import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NavBar} from "./components/nav-bar.tsx";
import {HomePage} from "./home-page.tsx";
import {MapPage} from "../map-page/map-page.tsx";
import {Directory} from "../directory/directory.tsx";
import {Directorypath} from "../directory/directory-links/directorypath.tsx";



export function Routing() {

    // Add more page navigation here

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar />}>
                        <Route index element={<HomePage/>} />
                        <Route path="map-page" element={<MapPage/>} />
                        <Route path="directory" element={<Directory/>}/>
                        <Route path="directorypage" element={<Directorypath/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}