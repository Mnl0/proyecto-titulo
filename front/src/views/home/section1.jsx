import React from "react";
import esilos from './section1.module.css';
import imgSection1 from './img00.png';
import { Link } from "react-router-dom";

const Section1 = () => {
    return (
        <div className={esilos.landingPageMain}>
            <div className={esilos.textContainer}>
                <h2>Bienvenido a WorkWise</h2>
                <p>Encuentra servicios particulares en nuestra plataforma de confianza.</p>
                <Link to="/login" className={esilos.btnComenzar}>Comenzar</Link>
            </div>
            <div className={esilos.imgContainer}>
                <img src={imgSection1} alt="Imagen de trabajadores WorkWise" />
            </div>
        </div>
    )
}

export default Section1;