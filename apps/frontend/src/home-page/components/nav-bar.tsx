import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../home-style.css"
import LoginPage from "../../login-components/login-page.tsx";
import Service from "../../service-request/service.tsx";

export function NavBar() {
    // Track authentication state
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check login status on component mount and when localStorage changes
    useEffect(() => {
        const checkLoginStatus = () => {
            const username = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            setIsLoggedIn(!!username && !!password);
        };

        // Check on mount
        checkLoginStatus();

        // Set up event listener for storage changes (in case user logs in/out in another tab)
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    return (
        <>
            <nav className={"bg-blue-500"}>
                <ul className={"flex place-items-center place-content-start space-x-5 h-20"}>
                    <li className={"nav-element font-bold w-20 text-xl"}>
                        <Link to="/">
                            <img className={"rounded hover-shadow"} src={"public/logo.png"} alt={"Home"} width={"100%"} height={"100%"}/>
                        </Link>
                    </li>
                    <li className={"nav-element"}>
                        <Link to="/map-page">Map</Link>
                    </li>
                    <li className={"nav-element"}>
                        <LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
                    </li>
                    {/* Only render the Service component if user is logged in */}
                    {isLoggedIn && (
                        <li className={"nav-element"}>
                            <Service />
                        </li>
                    )}
                </ul>
                <hr />
            </nav>

            <Outlet />
        </>
    );
}