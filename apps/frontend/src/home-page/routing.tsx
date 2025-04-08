import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NavBar} from "./components/nav-bar.tsx";
import {HomePage} from "./home-page.tsx";
import {MapPage} from "../MapPage/MapPage.tsx";
import {Directory} from "../directory/directory.tsx";
import {DirectoryLocation} from "../directory/components/DirectoryLocation.tsx";
import {Display} from "../service-request/display.tsx";
import {MapAPIPage} from "../MapsAPIPage/MapAPIPage.tsx";
import Language from "../service-request/service";


import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export function Routing() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar />}>
                        <Route index element={<HomePage/>} />
                        <Route path="map-page" element={<MapPage/>} />
                        <Route path="map-API" element={<MapAPIPage/>} />
                        <Route path="/submission" element={<Display />} />
                        <Route path="directory" element={<Directory/>}/>
                        <Route path="/directory/:topic" element={<DirectoryLocation />} />
                        <Route path="/language-form" element={<Language />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
