import React, { useEffect, useState} from "react";
import styles from "./customerPanel.module.css";
//import { FaUser, FaPowerOff } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from '../login/authContext.jsx';
import SelectGlass from '../components/selects/selectGlass.jsx';
import { ButtonGoogle } from "../components/buttons/buttonGoogle.jsx";
import AvatarEditor from "../components/avatarEditor/avatarEditor.jsx";
import TableUsers from '../components/listUsers/listUsers.jsx';

const CustomerPanel = () => {
    const {user} = useAuth();
    const [showTable, setShowTable] = useState(false); // Estado para controlar la visibilidad de TableUsers
    const [loading, setLoading] = useState(false); // Estado para controlar el estado de carga
    const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar mensajes de error
    const [category, setCategory] = useState("zzz"); // Estado para almacenar la categoría seleccionada
    const [dataTestFront, setDataTestFront] = useState([]);

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
        setUserLocation(uLoc);
        console.log(userLocation)   //Usar para el mapa.
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

    const handleSearch = async () => {
        setLoading(true); // Iniciar el estado de carga
        console.log(category)
        console.log(user)
        try {
            // Simular una llamada a la base de datos para obtener trabajadores con la categoría seleccionada
            //const response = await fetch(`https://api.example.com/workers?category=${category}`);
            //const data = await response.json();

            //Implementacion para pruebas...
            await setDataTestFront(
                [
                    { photo: null, name: 'Juan Pedraza', category: 'Gasfitería', rate: 4.5 },
                    { photo: null, name: 'Luis Jara', category: 'Pintura', rate: 3.5 },
                    { photo: null, name: 'Naya Difícil', category: 'Carpintería', rate: 4.5 },
                    { photo: null, name: 'Nelson Mauri', category: 'Jardinería', rate: 4.5 },
                    { photo: null, name: 'Antonio Ríos', category: 'Gasfitería', rate: 4.5 }
                ]
            )         

            // Si hay datos, mostrar la tabla de usuarios
            if (dataTestFront.length > 0) {
                setShowTable(true);
                setErrorMessage("");
            } else {
                // Si no hay datos, mostrar un mensaje de que no se encontraron registros
                setShowTable(false);
                setErrorMessage("No se encontraron registros.");
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            setErrorMessage("Hubo un error al obtener los datos.");
        } finally {
            setLoading(false); // Finalizar el estado de carga
        }
    };

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
                        <div className={styles.userDataContainer}>
                            <AvatarEditor />
                            <h2 className={styles.userName}>{user.name}</h2>
                            <p className={styles.userEmail}>{user.email}</p>
                        </div>
                    ) 
                }

            </div>

            <div className={styles.looker}>
                <h2 className={styles.title}>Bienvenid@, buscas un Trabajador?</h2>
                <SelectGlass onSelect={setCategory} />
                <ButtonGoogle clicEvent={handleSearch}/> {/* Botón para buscar trabajadores */}
                {loading && <p>Cargando...</p>} {/* Mostrar mensaje de carga si loading es true */}
                {!loading && errorMessage && <p>{errorMessage}</p>} {/* Mostrar mensaje de error si hay un error */}
                {showTable && !loading && !errorMessage && <TableUsers people={dataTestFront} />} {/* Mostrar TableUsers solo si showTable es true y no hay ni carga ni error */}
            </div>
        </div>
    )
}

export default CustomerPanel;