import React, { useEffect, useState} from "react";
import styles from "./workerPanel.module.css";
import { Link } from "react-router-dom";
import { useAuth } from '../components/authContext.jsx';
import MyAvatarEditor from "../components/avatarEditor/avatarEditor.jsx";
import WorkerCard from '../components/card/WorkerCard.jsx';


const WorkerPanel = () => {
    const {user} = useAuth();

    const user2 = {
        name: 'Trabajador Prueba',
        email: 'trabajador@mail.com',
        id: 'shjasdghj23jh2g3jhg23'
    }

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
        let uLoc = {
            ltd: location.coords.latitude,
            lng: location.coords.longitude
        }
        setUserLocation(uLoc);
        //console.log(userLocation)   //Usar para el mapa.
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
        <div >
            {
                user2 === null ? (
                    <div>
                        <h2>Lo sentimos, debes iniciar sesión.</h2>
                        <Link to='/'>Iniciar Sesión</Link>
                    </div>
                ) : (
                    <div className={styles.panelContainer}>
                        <div className={styles.card}>
                            <div className={styles.userDataContainer}>
                                <MyAvatarEditor user={user2}/>
                                <h2 className={styles.userName}>{user2.name}</h2>
                                <p className={styles.userEmail}>{user2.email}</p>
                            </div>
                        </div>
                        <div>
                            <WorkerCard />
                        </div>
                    </div>
                ) 
            }
        </div>
    )
}

export default WorkerPanel;