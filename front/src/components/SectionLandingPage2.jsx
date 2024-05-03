import React from "react";
import esilos from './SectionLandingPage2.module.css'
import imgLanding2 from '../img/img13.jpeg';
import { Link } from "react-router-dom";

const SectionLandingPage2 = () => {

    return (
        <div className={esilos.landingPageMain2}>
            <div className={esilos.imgContainer}>
                <img src={imgLanding2} alt="Imagen Pagina home" />
            </div>
            <div className={esilos.textContainer}>
                <h2>Consigue clientes, muestra tu trabajo y organiza tu tiempo</h2>
                <p>Encuentra trabajo, gestiona el tiempo para realizarlo y destaca con tu experiencia, todo desde una sola plataforma. Simplifica tu día a día y crece profesionalmente con nosotros.</p>
                <Link to="/login" className={esilos.btnComenzar}>Comenzar</Link>
            </div>
        </div>
    )
}

export default SectionLandingPage2;