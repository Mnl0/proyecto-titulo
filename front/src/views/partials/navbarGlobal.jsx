import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import stylesNavbarGlobal from './navbarGlobal.module.css';
import imgLogo from '../../img/logo3.png';

const GlobalNavbar = ({ onNavClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    useEffect(() => {

    }, [isOpen]);

    const handleClick = () =>{
        onNavClick(); 
        setIsOpen(null)
    }

    return (
        <div className={isOpen ? `${stylesNavbarGlobal.headerContainer} ${stylesNavbarGlobal.headerOpen}` : stylesNavbarGlobal.headerContainer}>
            <nav className={stylesNavbarGlobal.topNavbar}>
                <div className={stylesNavbarGlobal.logoContainer}>
                    <Link to='/' onClick={onNavClick} className={`${stylesNavbarGlobal.linkLogo}`}>
                        <img src={imgLogo} alt="Logo Workwise"></img>
                    </Link>
                </div>
            
                <div className={stylesNavbarGlobal.contLinks}>
                    <ul className={stylesNavbarGlobal.globalLinks}>
                        <li>
                            <Link to="/" onClick={handleClick} className={stylesNavbarGlobal.link}>Home</Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={handleClick} className={stylesNavbarGlobal.link}>About</Link>
                        </li>
                        <li>
                            <Link to="contact" onClick={handleClick} className={stylesNavbarGlobal.link}>Contact</Link>
                        </li>
                    </ul>
                    <ul className={isOpen ? `${stylesNavbarGlobal.sesionLinks} ${stylesNavbarGlobal.menuOpen}` : stylesNavbarGlobal.sesionLinks}>
                        <li>
                            <Link to="/" onClick={handleClick} className={stylesNavbarGlobal.link}>Unirse ahora</Link>
                        </li>
                        <li className={stylesNavbarGlobal.liSession}>
                            <Link to="/" onClick={handleClick} className={stylesNavbarGlobal.link}>Inicia sesión</Link>
                        </li>
                    </ul>
                </div>
            <div onClick={toggleMenu} className={stylesNavbarGlobal.menuIconContainer}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </div>
        </nav>
        </div>
    )
}

export default GlobalNavbar;