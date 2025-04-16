import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
    Button,
    Flex,
    Image,
    Box,
    Group,
    Anchor,
    Burger,
    UnstyledButton,
    Tabs,
    Menu,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import '../home-style.css';
import { useLogin } from './LoginContext'; // adjust path if needed
import Service from '../../service-request/LanguageInterpreterSR.tsx';
import AdminPage from '../../AdminPage/AdminPage.tsx';
import { MapEditor } from '../../IndoorMapPage/MapEditor.tsx';

import { useDisclosure } from '@mantine/hooks';

type NavItem = {
    name: string;
    link: string;
};

export const navItems: NavItem[] = [
    { name: 'Navigation', link: '/map-API' },

    // { name: "Map", link: "/map-page" },
    // { name: "Node Directory", link: "/NodeDirectory" },
    // { name: "Directory", link: "/directory" },
];

export const adminNavItems: NavItem[] = [
    { name: 'Service Request', link: '/service-request-page' }, //add service rec routting here logan
    { name: 'Admin Page', link: '/admin-page' },
    { name: 'Map Editor', link: '/map-editor' },

    // { name: "Profile", link: "/submission" }// potential delighter- login button can be in this
];

export function NavBar() {
    const { isLoggedIn, logout } = useLogin();
    const navigate = useNavigate();

    const [opened, { toggle }] = useDisclosure();

    return (
        <>
            <nav>
                <Group h="100%" px="md" py="sm" bg="blueBase.9">
                    <Menu
                        shadow="lg"
                        onClose={toggle}
                        transitionProps={{ transition: 'rotate-right', duration: 200 }}
                    >
                        <Menu.Target>
                            <Burger
                                opened={opened}
                                onClick={toggle}
                                hiddenFrom="sm"
                                size="md"
                                aria-label="Toggle navigation"
                            />
                        </Menu.Target>

                        <Menu.Dropdown>
                            {navItems.map((item, index) => (
                                <>
                                    <Menu.Item
                                        key={index}
                                        color="white"
                                        component={Link}
                                        to={item.link}
                                        px="md"
                                    >
                                        {item.name}
                                    </Menu.Item>
                                </>
                            ))}
                            {isLoggedIn && (
                                <>
                                    {adminNavItems.map((item, index) => (
                                        <Menu.Item
                                            key={index}
                                            color="white"
                                            component={Link}
                                            to={item.link}
                                            px="md"
                                        >
                                            {item.name}
                                        </Menu.Item>
                                    ))}
                                    <Menu.Divider />
                                    {/* Logout Button */}
                                    <Menu.Item
                                        color="red"
                                        px="md"
                                        component={Link}
                                        to={'/'}
                                        onClick={logout}
                                    >
                                        Logout
                                    </Menu.Item>
                                </>
                            )}
                        </Menu.Dropdown>
                    </Menu>

                    <Group justify="space-between" style={{ flex: 1 }}>
                        {/* Logo */}

                        <Link to="/">
                            <Image
                                className={'rounded'}
                                src={'/logoMassGeneralBrighamWhiteText.png'}
                                alt={'Home'}
                                h="xl"
                            />
                        </Link>

                        {/*</Flex>*/}
                        <Group ml="xl" gap="md" visibleFrom="sm">
                            {/* Dynamically Render Buttons */}
                            {navItems.map((item, index) => (
                                <Button
                                    variant="filled"
                                    color="baseBlue.9"
                                    className="navButton"
                                    justify="flex-end"
                                    component={Link}
                                    to={item.link}
                                    size="xs"
                                >
                                    {item.name}
                                </Button>
                            ))}
                            {isLoggedIn && (
                                <>
                                    {adminNavItems.map((item, index) => (
                                        <Button
                                            variant="filled"
                                            color="baseBlue.9"
                                            className="navButton"
                                            justify="flex-end"
                                            component={Link}
                                            to={item.link}
                                            size="xs"
                                        >
                                            {item.name}
                                        </Button>
                                    ))}
                                    {/* Logout Button */}
                                    <Button
                                        variant="filled"
                                        color="baseBlue.9"
                                        className="LoggoutButton"
                                        justify="flex-end"
                                        onClick={logout}
                                        component={Link}
                                        to={'/'}
                                        size="xs"
                                    >
                                        Log Out
                                    </Button>
                                </>
                            )}
                        </Group>
                    </Group>
                </Group>
            </nav>
            <Outlet />
        </>
    );
}
