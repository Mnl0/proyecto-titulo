import React from "react";
import esilos from './SectionLandingPage1.module.css'
import imgLanding1 from '../img/img00.png';
import { Link } from "react-router-dom";

const SectionLandingPage1 = () => {

    return (
        <div className={esilos.landingPageMain}>
            <div className={esilos.textContainer}>
                <h2>Bienvenido a WorkWise</h2>
                <p>Encuentra servicios particulares en nuestra plataforma de confianza.</p>
                <Link to="/login" className={esilos.btnComenzar}>Comenzar</Link>
            </div>
            <div className={esilos.imgContainer}>
                <img src={imgLanding1} alt="Imagen de trabajadores WorkWise" />
            </div>
        </div>
    )
}

export default SectionLandingPage1;