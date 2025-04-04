import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NavBar} from "./components/nav-bar.tsx";
import {HomePage} from "./home-page.tsx";
import {MapPage} from "../MapPage/MapPage.tsx";
import {Directory} from "../directory/directory.tsx";
import {DirectoryLocation} from "../directory/components/DirectoryLocation.tsx";
import {Display} from "../service-request/submissionDisplay/display.tsx";

export function Routing() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar />}>
                        <Route index element={<HomePage/>} />
                        <Route path="map-page" element={<MapPage/>} />
                        <Route path="/submission" element={<Display />} />
                        <Route path="directory" element={<Directory/>}/>
                        <Route path="/directory/:topic" element={<DirectoryLocation />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}