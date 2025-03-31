import { Outlet, Link } from "react-router-dom";

export function NavBar() {
    return (
        <>
            <nav>
                <ul >
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/map-page">Map</Link></li>
                </ul>
                <hr />
            </nav>

            <Outlet />
        </>
    );
}