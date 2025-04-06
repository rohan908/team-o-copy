import { Outlet, Link, useNavigate } from "react-router-dom";
import {Button, Flex, Image} from "@mantine/core";
import { useState, useEffect } from 'react';
// import "../home-style.css";
import LoginPage from "../../login-components/login-page.tsx";
import Service from "../../service-request/service.tsx";
import classes from '../../styles.css'

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



    return (
        <>
            <nav>
                <Flex py="4" px="20" gap="md" bg="white" variant="dark" justify="flex-start" align="center">

                    {/* Logo */}
                        <Link to="/">
                            <Image
                                className={"rounded"}
                                src={"public/logo.png"}
                                alt={"Home"}
                                h={50}
                            />
                        </Link>

                        {/* Dynamically Render Buttons */}
                        {navItems.map((item, index) => (
                            <Button variant="outline"
                                    color="blueBase.9"
                                    component={Link}
                                    className="navButton"
                                    to={item.link}
                                    // styles={{
                                    //     root: {
                                    //         '--button-hover': 'black',
                                    //     },
                                    // }}
                            >
                                {item.name}
                            </Button>
                        ))}
                        {/* Login Page */}
                    {/*// make modal https://mantine.dev/core/modal/*/}
                    <LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />

                    {isLoggedIn && (
                       // ik this is a shit implementaion, make modal https://mantine.dev/core/modal/
                            <Service />
                    )}


                </Flex>
            </nav>

            <Outlet />
        </>
    );
}