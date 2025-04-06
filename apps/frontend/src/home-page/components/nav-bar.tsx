import { Outlet, Link } from "react-router-dom";
import {Button, Flex, Image} from "@mantine/core";
import "../home-style.css";
import LoginPage from "../../login-components/login-page.tsx";

type NavItem = {
    name: string;
    link: string;
}

export const navItems: NavItem[] = [

    { name: "Map", link: "/map-page" },
    { name: "Directory", link: "/directory" },
];

export function NavBar() {
    return (
        <>
            <nav>
                <Flex py="4" px="20" gap="md" bg="white" variant="dark" justify="flex-start" align="center">

                    {/* Logo */}
                        <Link to="/">
                            <Image
                                className={"rounded hover-shadow"}
                                src={"public/logo.png"}
                                alt={"Home"}
                                h={50}
                            />
                        </Link>

                        {/* Dynamically Render Buttons */}
                        {navItems.map((item, index) => (
                            <Button variant="outline" color="blueBase.9" component={Link} to={item.link}> {item.name}
                            </Button>
                        ))}
                        {/* Login Page */}
                        <LoginPage />

                </Flex>
            </nav>

            <Outlet />
        </>
    );
}