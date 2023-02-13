import React from 'react';
import {Link, NavLink} from "react-router-dom";
import logo from "../logo.svg";

function NavBar() {
    return (
        <nav>
            <Link to="/">
                <span><img src={logo} alt="logo" width="40"/></span>
            </Link>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/inloggen">Inloggen</NavLink>
            <NavLink to="/uitloggen">Uitloggen</NavLink>
        </nav>
    );
}

export default NavBar;