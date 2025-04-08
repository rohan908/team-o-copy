import { Outlet, Link, useNavigate } from "react-router-dom";
import {Button, Flex, Image, Box, Group, Anchor, Burger, UnstyledButton, Tabs, Menu} from "@mantine/core";
import { useState, useEffect } from 'react';


import {useDisclosure} from "@mantine/hooks";

type NavItem = {
    name: string;
    link: string;
}

export const navItems: NavItem[] = [

    { name: "Map", link: "/map-page" },
    { name: "Directory", link: "/directory" },
    { name: "Navigation", link: "/map-API" },
];


export function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <nav>
                <Group h="100%" px="md" py="sm">

                    <Menu  shadow="lg"  onClose={toggle} transitionProps={{ transition: 'rotate-right', duration: 200 }} >
                        <Menu.Target>
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" aria-label="Toggle navigation" />
                        </Menu.Target>

                        <Menu.Dropdown >
                            {navItems.map((item, index) => (
                                <>
                                <Menu.Item
                                    color="grey.3"
                                    component={Link}
                                    to={item.link}
                                    px="md"
                                >
                                {item.name}
                                </Menu.Item>
                                </>
                            ))}

                        </Menu.Dropdown>
                    </Menu>

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
                        <Group ml="xl" gap="md" visibleFrom="sm">
                            {/* Dynamically Render Buttons */}
                            {navItems.map((item, index) => (
                                <Button variant="outline"
                                        color="black"
                                        className="navButton"
                                        justify="flex-end"
                                        component={Link}
                                        to={item.link}
                                        size="xs"
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </Group>

                    </Group>
                </Group>
            </nav>
            <Outlet />
        </>
    );
}
