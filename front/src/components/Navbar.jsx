import React, { useState } from 'react';
import estilos from './Navbar.module.css';
import { FaHouse, FaScrewdriverWrench, FaList, FaUserLarge } from "react-icons/fa6";

const Navbar = () => {

    const [actualLink, setActualLink] = useState('home');

    const handleLinkClick = (link) => {
        setActualLink(link);
    }

    return (
        <nav className={estilos.userNavbar}>
            <ul>
                <li>
                    <a href='#' onClick={() => handleLinkClick('home')} className={`nav-link ${actualLink === 'home' ? estilos.active : ''}`}>
                        <div><FaHouse className={estilos.svgStyle} /></div>
                        <div><span>Home</span></div>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={() => handleLinkClick('servicios')} className={`nav-link ${actualLink === 'servicios' ? estilos.active : ''}`}>
                        <div><FaScrewdriverWrench className={estilos.svgStyle}/></div>
                        <div><span>Servicios</span></div>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={() => handleLinkClick('actividad')} className={`nav-link ${actualLink === 'actividad' ? estilos.active : ''}`}>
                        <div><FaList className={estilos.svgStyle}/></div>
                        <div><span>Actividad</span></div>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={() => handleLinkClick('perfil')} className={`nav-link ${actualLink === 'perfil' ? estilos.active : ''}`}>
                        <div><FaUserLarge className={estilos.svgStyle}/></div>
                        <div><span>Perfil</span></div>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;