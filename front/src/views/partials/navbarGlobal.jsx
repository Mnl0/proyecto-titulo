import React from "react";
import { Link } from "react-router-dom";
import stylesNavbarGlobal from './navbarGlobal.module.css';

const GlobalNavbar = () => {
    return (
        <nav className={stylesNavbarGlobal.topNavbar}>
            <div><Link to='/home' className={stylesNavbarGlobal.enlace}>WorkWise</Link></div>
            <ul className={stylesNavbarGlobal.globalLinks}>
                <li>
                    <Link to="/home" className={stylesNavbarGlobal.enlace}>Home</Link>
                </li>
                <li>
                    <Link to="/about" className={stylesNavbarGlobal.enlace}>About</Link>
                </li>
                <li>
                    <Link to="contact" className={stylesNavbarGlobal.enlace}>Contact</Link>
                </li>
            </ul>
            <ul className={stylesNavbarGlobal.sesionLinks}>
                <li>
                    <Link className={stylesNavbarGlobal.enlace}>Unirse ahora</Link>
                </li>
                <li>
                    <Link className={stylesNavbarGlobal.enlace}>Inicia sesión</Link>
                </li>
            </ul>
        </nav>
    )
}

export default GlobalNavbar;