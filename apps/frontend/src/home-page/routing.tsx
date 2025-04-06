import { BrowserRouter, Routes, Route } from "react-router-dom";
import {NavBar} from "./components/nav-bar.tsx";
import {HomePage} from "./home-page.tsx";
import {MapPage} from "../MapPage/MapPage.tsx";
import {Directory} from "../directory/directory.tsx";
import {DirectoryLocation} from "../directory/components/DirectoryLocation.tsx";
import {Display} from "../service-request/submissionDisplay/display.tsx";

import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export function Routing() {
    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            {/*<AppShell*/}
            {/*    header={{ height: 60 }}*/}
            {/*    navbar={{*/}
            {/*        width: 300,*/}
            {/*        breakpoint: 'sm',*/}
            {/*        collapsed: { mobile: !opened },*/}
            {/*    }}*/}
            {/*    padding="md"*/}
            {/*>*/}
            {/*    <AppShell.Header>*/}
            {/*        <Burger*/}
            {/*            opened={opened}*/}
            {/*            onClick={toggle}*/}
            {/*            hiddenFrom="sm"*/}
            {/*            size="sm"*/}
            {/*        />*/}
            {/*        <div>Logo</div>*/}
            {/*    </AppShell.Header>*/}

            {/*    <AppShell.Navbar p="md">Navbar</AppShell.Navbar>*/}
            {/*    <AppShell.Main>Main</AppShell.Main>*/}
            {/*    */}
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

            {/*</AppShell>*/}
        </>
    );
}