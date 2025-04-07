import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../home-style.css';
import { useState, useEffect } from 'react';
import LoginPage from '../../login-components/login-page.tsx';
import Service from '../../service-request/service.tsx';
import AdminPage from "../../AdminPage/AdminPage.tsx";

export function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const checkLoginStatus = () => {
            const username = localStorage.getItem('username');
            const password = localStorage.getItem('password');
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
        }
    }, [isLoggedIn]);
    return (
        <>
            <nav className={'bg-blue-500'}>
                <ul className={'flex place-items-center place-content-start space-x-5 h-20'}>
                    <li className={'nav-element font-bold w-20 text-xl'}>
                        <Link to="/">
                            <img
                                className={'rounded hover-shadow'}
                                src={'public/logo.png'}
                                alt={'Home'}
                                width={'100%'}
                                height={'100%'}
                            />
                        </Link>
                    </li>
                    <li className={'nav-element'}>
                        <Link to="/map-page">Map</Link>
                    </li>
                    <li className={'nav-element'}>
                        <Link to="/directory">Directory</Link>
                    </li>
                    {/* Check login status */}
                    {isLoggedIn && (
                        <>
                            <li className={"nav-element"}>
                                <Link to="/AdminPage">AdminPage</Link>
                            </li>
                            <li className={'nav-element'}>
                                <Service />
                            </li>
                        </>
                    )}
                    <li className={'nav-element'}>
                        <LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
                    </li>
                </ul>
                <hr />
            </nav>

            <Outlet />
        </>
    );
}
