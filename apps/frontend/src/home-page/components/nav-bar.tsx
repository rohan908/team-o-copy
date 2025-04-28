import { Outlet, Link } from 'react-router-dom';
import { Button, Flex, Box, Group, MantineProvider } from '@mantine/core';
import { useLogin } from './LoginContext'; // adjust path if needed
import { useState, useEffect } from 'react';
import '../home-style.css';

type NavItem = {
    name: string;
    link: string;
};

export const navItems: NavItem[] = [
    // { name: 'Navigation', link: '/map-API' },
    { name: 'About', link: '/About-page' },
];

export const adminNavItems: NavItem[] = [
    //{ name: 'Service Request', link: '/service-request-page' },
    { name: 'Admin Page', link: '/admin-page' },
    //{ name: 'Map Editor', link: '/map-editor' },
];

export const loginItems: NavItem[] = [{ name: 'Log In', link: '/log-in-page' }];

export function NavBar() {
    const { isLoggedIn, logout } = useLogin();

    return (
        <>
            <Box
                component="nav"
                pos="sticky"
                top={'10px'}
                bg="transparent"
                style={{
                    zIndex: 999,
                }}
            >
                <Group h="0px" px="md" bg="transparent">
                    <Group justify="space-between" style={{ flex: 1 }}>
                        {/* Logo */}
                        <Link to="/">
                            <Flex
                                bg="#1C43A7"
                                w="50px"
                                h="50px"
                                style={{
                                    borderRadius: '50%',
                                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.7)',
                                    zIndex: 999,
                                }}
                                justify="center"
                                align="center"
                            >
                                <img
                                    height="25px"
                                    width="25px"
                                    src={'/goldLogoMassGeneralBrigham.png'}
                                    alt="Logo"
                                />
                            </Flex>
                        </Link>

                        <Group
                            ml="xl"
                            gap="md"
                            visibleFrom="sm"
                            bg="#1C43A7"
                            style={{
                                borderRadius: '22.5px',
                                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.7)',
                                zIndex: 999,
                            }}
                        >
                            <Box m="3px" bg="blueBase.6" style={{ borderRadius: '20px' }}>
                                <Box m="3px" bg="#1C43A7" style={{ borderRadius: '20px' }}>
                                    {/* Navigation Items */}
                                    {navItems.map((item, index) => (
                                        <MantineProvider theme={{ activeClassName: '' }}>
                                            <Button
                                                key={index}
                                                variant="filled"
                                                color="baseBlue.6"
                                                className="navButton"
                                                justify="flex-end"
                                                component={Link}
                                                to={item.link}
                                                size="sm"
                                                style={{ borderRadius: '8px' }}
                                            >
                                                {item.name}
                                            </Button>
                                        </MantineProvider>
                                    ))}

                                    {/* Log In Button (only when logged out) */}
                                    {!isLoggedIn &&
                                        loginItems.map((item, index) => (
                                            <MantineProvider theme={{ activeClassName: '' }}>
                                                <Button
                                                    key={index}
                                                    variant="filled"
                                                    color="baseBlue.6"
                                                    className="navButton"
                                                    justify="flex-end"
                                                    component={Link}
                                                    to={item.link}
                                                    size="sm"
                                                    style={{ borderRadius: '8px' }}
                                                >
                                                    {item.name}
                                                </Button>
                                            </MantineProvider>
                                        ))}

                                    {/* Admin Buttons and Log Out (only when logged in) */}
                                    {isLoggedIn && (
                                        <>
                                            {adminNavItems.map((item, index) => (
                                                <MantineProvider theme={{ activeClassName: '' }}>
                                                    <Button
                                                        key={index}
                                                        variant="filled"
                                                        color="baseBlue.6"
                                                        className="navButton"
                                                        justify="flex-end"
                                                        component={Link}
                                                        to={item.link}
                                                        size="sm"
                                                        style={{ borderRadius: '8px' }}
                                                    >
                                                        {item.name}
                                                    </Button>
                                                </MantineProvider>
                                            ))}
                                            <MantineProvider theme={{ activeClassName: '' }}>
                                                <Button
                                                    variant="filled"
                                                    color="baseBlue.6"
                                                    className="LoggoutButton"
                                                    justify="flex-end"
                                                    onClick={logout}
                                                    component={Link}
                                                    to="/"
                                                    size="sm"
                                                    style={{ borderRadius: '8px' }}
                                                >
                                                    Log Out
                                                </Button>
                                            </MantineProvider>
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </Group>
                    </Group>
                </Group>
            </Box>
            <Box>
                <Outlet />
            </Box>
        </>
    );
}
