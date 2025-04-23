import { Outlet, Link } from 'react-router-dom';
import {
  Button,
  Flex,
  Box,
  Group,
} from '@mantine/core';
import { useLogin } from './LoginContext'; // adjust path if needed
import { useState, useEffect } from 'react';
import '../home-style.css';

type NavItem = {
  name: string;
  link: string;
};

export const navItems: NavItem[] = [
  { name: 'Navigation', link: '/map-API' },
];

export const adminNavItems: NavItem[] = [
  { name: 'Service Request', link: '/service-request-page' },
  { name: 'Admin Page', link: '/admin-page' },
  { name: 'Map Editor', link: '/map-editor' },
];

export const loginItems: NavItem[] = [
  { name: 'Log In', link: '/log-in-page' },
];

export function NavBar() {
  const { isLoggedIn, logout } = useLogin();

  return (
    <>
      <Box
        component="nav"
        pos="sticky"
        top={0}
        bg="transparent"
        style={{ zIndex: 999 }}
      >
        <Group h="0px" px="md" bg="transparent">
          <Group justify="space-between" style={{ flex: 1 }}>
            {/* Logo */}
            <Link to="/">
              <Flex
                bg="blueBase.8"
                w="50px"
                h="50px"
                style={{
                  borderRadius: "50%",
                }}
                justify="center"
                align="center"
              >
                <img
                  height="25px"
                  width="25px"
                  src={"/goldLogoMassGeneralBrigham.png"}
                  alt="Logo"
                />
              </Flex>
            </Link>

            <Group ml="xl" gap="md" visibleFrom="sm" bg="blueBase.9" style={{ borderRadius: "20px" }}>
              <Box m="3px" bg="blueBase.6" style={{ borderRadius: "20px" }}>
                <Box m="3px" bg="blueBase.9" style={{ borderRadius: "20px" }}>
                  {/* Navigation Items */}
                  {navItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="filled"
                      color="baseBlue.6"
                      className="navButton"
                      justify="flex-end"
                      component={Link}
                      to={item.link}
                      size="sm"
                    >
                      {item.name}
                    </Button>
                  ))}

                  {/* Log In Button (only when logged out) */}
                  {!isLoggedIn && loginItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="filled"
                      color="baseBlue.6"
                      className="navButton"
                      justify="flex-end"
                      component={Link}
                      to={item.link}
                      size="sm"
                    >
                      {item.name}
                    </Button>
                  ))}

                  {/* Admin Buttons and Log Out (only when logged in) */}
                  {isLoggedIn && (
                    <>
                      {adminNavItems.map((item, index) => (
                        <Button
                          key={index}
                          variant="filled"
                          color="baseBlue.6"
                          className="navButton"
                          justify="flex-end"
                          component={Link}
                          to={item.link}
                          size="sm"
                        >
                          {item.name}
                        </Button>
                      ))}
                      <Button
                        variant="filled"
                        color="baseBlue.6"
                        className="LoggoutButton"
                        justify="flex-end"
                        onClick={logout}
                        component={Link}
                        to="/"
                        size="sm"
                      >
                        Log Out
                      </Button>
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
