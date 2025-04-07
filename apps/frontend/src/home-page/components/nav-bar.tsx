import { Outlet, Link, useNavigate } from 'react-router-dom';
import "../home-style.css";
import { useLogin } from './LoginContext'; // adjust path if needed
import Service from '../../service-request/service.tsx';

export function NavBar() {
    const { isLoggedIn, logout } = useLogin();
    const navigate = useNavigate();

    return (
        <>
            <nav className={"bg-blue-500"}>
                <ul className={"flex place-items-center place-content-start space-x-5 h-20"}>
                    <li className={"nav-element font-bold w-20 text-xl"}>
                        <Link to="/">
                            <img className={"rounded hover-shadow"} src={"public/logo.png"} alt={"Home"} width={"100%"} height={"100%"} />
                        </Link>
                    </li>
                    <li className={"nav-element"}>
                        <Link to="/map-page">Map</Link>
                    </li>
                    <li className={"nav-element"}>
                        <Link to="/directory">Directory</Link>
                    </li>
                    {isLoggedIn && (
                        <>
                            <li className={"nav-element"}>
                                <Service />
                            </li>
                            <li className={"nav-element"}>
                                <button
                                    onClick={() => {
                                        logout();
                                        navigate('/');
                                    }}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
                <hr />
            </nav>

            <Outlet />
        </>
    );
}
