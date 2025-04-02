import { Outlet, Link } from "react-router-dom";
import "../home-style.css"

export function NavBar() {

    // Add more page navigation here

    return (
        <>
            <nav className={"bg-blue-500"}>
                <ul className={"flex place-items-center place-content-start space-x-5 h-20"}>
                    <li className={"nav-element font-bold text-xl"}>
                        <Link to="/">
                            <img alt={"home icon goes here"}/>
                            <h1>Home</h1>
                        </Link>
                    </li>
                    <li className={"nav-element"}>
                        <Link to="/map-page">Map</Link>
                    </li>
                </ul>
                <hr />
            </nav>

            <Outlet />
        </>
    );
}