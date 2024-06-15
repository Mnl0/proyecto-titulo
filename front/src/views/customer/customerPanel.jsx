import React, { useEffect, useState} from "react";
import styles from "./customerPanel.module.css";
//import { FaUser, FaPowerOff } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from '../components/authContext.jsx';
import SelectGlass from '../components/selects/selectGlass.jsx';
import { ButtonGoogle } from "../components/buttons/buttonGoogle.jsx";
import MyAvatarEditor from "../components/avatarEditor/avatarEditor.jsx";
import WorkerCards from '../components/workerCards/WorkerCards.jsx';

const CustomerPanel = () => {
    const {user} = useAuth();
    const [showTable, setShowTable] = useState(false); // Estado para controlar la visibilidad de TableUsers
    const [loading, setLoading] = useState(false); // Estado para controlar el estado de carga
    const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar mensajes de error
    const [category, setCategory] = useState(""); // Estado para almacenar la categoría seleccionada
    const [dataTestFront, setDataTestFront] = useState([]);
    const [categories, setCategories] = useState([]);

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

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/category/getAll');
            if (!response.ok) throw new Error('No se pudieron cargar las categorías');
            const data = await response.json();
            setCategories(data);
          } catch (error) {
            console.error('Error al obtener las categorías:', error);
          }
        };
        fetchCategories();
      }, []);

    const handleSearch = async () => {
        setLoading(true); // Iniciar el estado de carga
        try {
            // Simular una llamada a la base de datos para obtener trabajadores con la categoría seleccionada
            //const response = await fetch(`https://api.example.com/workers?category=${category}`);
            //const data = await response.json();

            //Implementacion para pruebas...
            await setDataTestFront(
                [
                    { photo: 'wr_8d69a45b-c671-49eb-92ff-f26ee8b0445d.png', name: 'Juan Pedraza', category: 'Gasfitería', rate: 4.5 },
                    { photo: 'cl_5f1ac2fc-6b7e-4eb0-a377-d4c28d26ad4e.png', name: 'Luis Jara', category: 'Pintura', rate: 3.5 },
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
        <div >
            {
                user === null ? (
                    <div>
                        <h2>Lo sentimos, debes iniciar sesión.</h2>
                        <Link to='/'>Iniciar Sesión</Link>
                    </div>
                ) : (
                    <div className={styles.panelContainer}>
                        <div className={styles.card}>
                            <div className={styles.userDataContainer}>
                                <MyAvatarEditor user={user} userType="client" />
                                <h2 className={styles.userName}>{user.name}</h2>
                                <p className={styles.userEmail}>{user.email}</p>
                            </div>
                            <div className={styles.searchControll}>
                                <h2 className={styles.title}>Bienvenid@ { user.firstName + ' ' + user.lastName}</h2>
                                <h3>¿Qué servicio buscas?</h3>
                                <div className={styles.searchContent}>
                                    <input className={styles.inpAddress} type="text" placeholder="Ingresa la dirección" />
                                    <input className={styles.inpFile} type="file" placeholder="Sube una evidencia" />
                                </div>
                                <textarea
                                    className={styles.textarea}
                                    id="serviceDescription"
                                    name="serviceDescription"
                                    rows="5"
                                    placeholder="Describe detalladamente el servicio que necesitas..."
                                />
                                <SelectGlass onSelect={setCategory} categories={categories} />
                                <ButtonGoogle clicEvent={handleSearch}/> {/* Botón para buscar trabajadores */}
                            </div>
                        </div>

                        <div >
                            {loading && <p>Cargando...</p>} {/* Mostrar mensaje de carga si loading es true */}
                            {!loading && errorMessage && <p>{errorMessage}</p>} {/* Mostrar mensaje de error si hay un error */}
                            {showTable && !loading && !errorMessage && <WorkerCards workers={dataTestFront} />} {/* Mostrar TableUsers solo si showTable es true y no hay ni carga ni error */}
                        </div>

                    </div>
                ) 
            }
        </div>
    )
}

export default CustomerPanel;