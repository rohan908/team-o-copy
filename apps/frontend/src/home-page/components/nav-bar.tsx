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
  Menu, ActionIcon,
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
];

export const adminNavItems: NavItem[] = [
  { name: 'Service Request', link: '/service-request-page' }, //add service rec routing here logan
  { name: 'Admin Page', link: '/admin-page' },
  { name: 'Map Editor', link: '/map-editor' },

  // { name: "Profile", link: "/submission" }// potential delighter- login button can be in this
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
        <Group h="0px" px="md" bg={"transparent"}>
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
                justify={"center"}
                align="center"
              >
                <img
                  height="25px"
                  width="25px"
                  src={"/goldLogoMassGeneralBrigham.png"}>
                </img>
              </Flex>
            </Link>

            <Group ml="xl" gap="md" visibleFrom="sm" bg="blueBase.9" style={{
              borderRadius: "20px",
            }}>
              <Box m="3px" bg="blueBase.6" style={{
                borderRadius: "20px",
              }}>
                <Box m="3px" bg="blueBase.9" style={{
                  borderRadius: "20px",
                }}>
                  {/* Dynamically Render Buttons */}
                  {navItems.map((item, index) => (
                    <Button
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
                  {isLoggedIn && (
                    <>
                      {adminNavItems.map((item, index) => (
                        <Button
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
                      {/* Logout Button */}
                      <Button
                        variant="filled"
                        color="baseBlue.6"
                        className="LoggoutButton"
                        justify="flex-end"
                        onClick={logout}
                        component={Link}
                        to={'/'}
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
      <Box pt="50px" style={{ backgroundColor: 'transparent' }}>
        <Outlet />
      </Box>
    </>
  );
}
