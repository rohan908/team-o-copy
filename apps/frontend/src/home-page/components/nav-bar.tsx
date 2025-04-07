import { Outlet, Link, useNavigate } from "react-router-dom";
import {Button, Flex, Image, Box, Group, Anchor, Burger, UnstyledButton, Tabs} from "@mantine/core";
import { useState, useEffect } from 'react';
// import "../home-style.css";
import LoginPage from "../../login-components/login-page.tsx";
import Service from "../../service-request/service.tsx";
import classes from '../../styles.css'
import {useDisclosure} from "@mantine/hooks";

type NavItem = {
    name: string;
    link: string;
}



export const navItems: NavItem[] = [

    { name: "Map", link: "/map-page" },
    { name: "Directory", link: "/directory" },
];

export function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    //this is deeply cursed but we'll change when we rewrite this
    useEffect(() => {
        const checkLoginStatus = () => {
            const username = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            setIsLoggedIn(!!username && !!password);
        };
        checkLoginStatus();
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);
    useEffect(() => {
        if (!isLoggedIn) {
            //navigate("/");
        } else {
            // navItems.push({})
        }
    }, [isLoggedIn]);

    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <nav>
                <Group h="100%" px="md" py="sm">
                    <Burger opened={opened}  onClick={toggle} hiddenFrom="sm" size="md" />
                    <Tabs  defaultValue="gallery">
                        <Tabs.List>
                            <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
                                Gallery
                            </Tabs.Tab>
                            <Tabs.Tab value="messages" leftSection={<IconMessageCircle size={12} />}>
                                Messages
                            </Tabs.Tab>
                            <Tabs.Tab value="settings" leftSection={<IconSettings size={12} />}>
                                Settings
                            </Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="gallery">
                            Gallery tab content
                        </Tabs.Panel>

                        <Tabs.Panel value="messages">
                            Messages tab content
                        </Tabs.Panel>

                        <Tabs.Panel value="settings">
                            Settings tab content
                        </Tabs.Panel>
                    </Tabs>


                    <Group justify="space-between" style={{ flex: 1 }}>
                            {/* Logo */}

                                <Link to="/">
                                    <Image
                                        className={"rounded"}
                                        src={"public/logoMassGeneralBrigham.png"}
                                        alt={"Home"}
                                        h='xl'
                                    />
                                </Link>


                        {/*</Flex>*/}
                        <Group ml="xl" gap={0} visibleFrom="sm">
                            {/* Dynamically Render Buttons */}
                            {navItems.map((item, index) => (
                                <Button variant="outline"
                                        color="black"
                                        component={Link}
                                        className="navButton"
                                        to={item.link}
                                        justify="flex-end"
                                    styles={{
                                        root: {

                                            '--button-hover': 'black',
                                        },
                                    }}
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </Group>
                            {/* Login Page
                            // make modal https://mantine.dev/core/modal/
                            <LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />

                            {isLoggedIn && (
                                // ik this is a shit implementaion, make modal https://mantine.dev/core/modal/
                                <Service />
                            )}
                            */}
                    </Group>
                </Group>
                </Group>
            </nav>

            <Outlet />
        </>
    );
}