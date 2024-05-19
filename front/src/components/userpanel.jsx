import React, { useEffect, useState } from "react";
import Map from "./googlemap";
import '../App.css';

const UserPanel = () => {
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
        <div className="userPanel">
            <div id="map" style={{width: '800px', height:'600px'}}></div>
            <Map location={userLocation}/>
        </div>
    )
}

export default UserPanel;