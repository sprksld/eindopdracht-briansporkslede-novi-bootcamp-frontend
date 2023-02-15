import "./NavBar.css"
import React, {useContext} from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import logo from "../../assets/Layer 1.svg";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <nav>
            <Link to="/">
                <span><img src={logo} alt="logo"/></span>
            </Link>

            <div>
                {!isAuth && <button type="button" onClick={() => navigate('/inloggen')}>Log in</button>}
                {isAuth &&
                    <>
                        <button type="button" onClick={() => navigate('/dashboard')}>Dashboard</button>
                        <button type="button" onClick={logout}>Uitloggen</button>
                    </>
                }
            </div>
        </nav>
    );
}

export default NavBar;