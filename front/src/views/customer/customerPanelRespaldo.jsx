import React, { useEffect, useState} from "react";
import styles from "./customerPanel.module.css";
import { FaUser, FaPowerOff } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from '../login/authContext.jsx';
import MapComponent from '../partials/mapComponent.jsx';


const CustomerPanel = () => {
    const {user} = useAuth();

    const [userLocation, setUserLocation] = useState({
        ltd: -36.8341573,
        lng: -73.0540712
    });

    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(okey, error);
        }else{
            console.log('Su dispositivo no soporta geolocalización.')
        }
    }, []);

    const okey = (location) => {
        console.log('location: ', location)
        let uLoc = {
            ltd: location.coords.latitude,
            lng: location.coords.longitude
        }
        console.log('uLoc: ', uLoc)
        setUserLocation(uLoc);
    }
    
    const error = (err) => {
        let msg = '';
        switch(err.code){
            case err.PERMISSION_DENIED: msg = 'No has permitido localizarte.'; break;
            case err.POSITION_UNAVAILABLE: msg = 'Tu posición no está disponible.'; break;
            case err.TIMEOUT: msg = 'Tiempo de espera superado. Vuelve a intentarlo.'; break;
            default: msg = 'Error desconocido'; break;
        }
        console.log(msg);
    }

    return (
        <div className={styles.panelContainer}>
            <div className={styles.card}>
                {
                    user === null ? (
                        <div>
                            <h2>Lo sentimos, debes iniciar sesión.</h2>
                            <Link to='/login'>Iniciar Sesión</Link>
                        </div>
                    ) : (
                        <div>
                            <div className={styles.userInfo}>
                                <div className={styles.userData}>
                                    <div className={styles.iconContainer}><FaUser /></div>
                                    <div className={styles.dataContainer}>
                                        <p>{user.name}</p>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                                <div className={styles.logoutContainer}>
                                    <div className={styles.iconContainer}><FaPowerOff /></div>
                                </div>
                            </div>

                            <div className={styles.serviceContainer}>
                                <div className={styles.searchContainer}>
                                    <form>
                                        <input  type="text" name="searchInput" className={styles.searchInput} placeholder="¿Qué servicio buscas?" />
                                    </form>
                                </div>
                                <div className={styles.mapContainer}>
                                    <MapComponent  location={userLocation} />
                                </div>
                            </div>
                        </div>
                    ) 
                }

            </div>
        </div>
    )
}

export default CustomerPanel;