import React from "react";
import estilosglobal from './GlobalNavbar.module.css';
import { Link } from "react-router-dom";

const GlobalNavbar = () => {

    return(
        <nav className={estilosglobal.topNavbar}>
            <div><Link to='/' className={estilosglobal.enlace}>LVM solutions</Link></div>
            <ul className={estilosglobal.globalLinks}>
                <li>
                    <Link to="/" className={estilosglobal.enlace}>Home</Link>
                </li>
                <li>
                    <Link to="/about" className={estilosglobal.enlace}>About</Link>
                </li>
                <li>
                    <Link to="contact" className={estilosglobal.enlace}>Contact</Link>
                </li>
            </ul>
            <ul className={estilosglobal.sesionLinks}>
                <li>
                    <Link className={estilosglobal.enlace}>Unirse ahora</Link>
                </li>
                <li>
                    <Link className={estilosglobal.enlace}>Inicia sesión</Link>
                </li>
            </ul>
        </nav>
    )
}

export default GlobalNavbar;