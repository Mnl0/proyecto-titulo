import React, { useEffect, useState} from "react";
import styles from "./customerPanel.module.css";
//import { FaUser, FaPowerOff } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from '../components/authContext.jsx';
import SelectGlass from '../components/selects/selectGlass.jsx';
import { ButtonGoogle } from "../components/buttons/buttonGoogle.jsx";
import MyAvatarEditor from "../components/avatarEditor/avatarEditor.jsx";
import WorkerCards from '../components/workerCards/WorkerCards.jsx';

import Modal from '../components/modals/modal/ModalChatRequest.jsx';
import Chat from '../components/chat/chat2.jsx';
import { io } from 'socket.io-client';

const CustomerPanel = () => {
    const {user} = useAuth();
    const [showWorkers, setShowWorkers] = useState(false); // Estado para controlar la visibilidad de TableUsers
    const [loading, setLoading] = useState(false); // Estado para controlar el estado de carga
    const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar mensajes de error
    const [category, setCategory] = useState(""); // Estado para almacenar la categoría seleccionada
    const [categories, setCategories] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState([]); // Para almacenar los IDs de usuarios conectados

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


    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true); // Iniciar el estado de carga
        try {
            console.log(category)
            const response = await fetch('http://localhost:3000/api/worker/getAllForOccupation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({category})
            });

            if (!response.ok) throw new Error('No se pudieron cargar los trabajadores.');
            const data = await response.json();
            // Si hay datos, mostrar trabajadores
            if (data.length > 0) {
              
                // Actualizar el estado de los trabajadores con el atributo 'online' agregado
                setWorkers(data);
                console.log('workers With Online Status', data)
                //setWorkers(data);
                setShowWorkers(true);
                setErrorMessage("");
            } else {
                // Si no hay datos, mostrar un mensaje de que no se encontraron registros
                setWorkers([])
                setShowWorkers(false);
                setErrorMessage("No se encontraron registros.");
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            setErrorMessage("Hubo un error al obtener los datos.");
        } finally {
            setLoading(false); // Finalizar el estado de carga
        }
    };

    const [selectedWorker, setSelectedWorker] = useState(null); // Estado para el trabajador seleccionado
    const [showModal, setShowModal] = useState(false); // Estado para la visibilidad del modal
    const [showChat, setShowChat] = useState(false); // Estado para la visibilidad del chat

    const handleWorkerClick = (worker) => {
        setSelectedWorker(worker);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmChat = () => {
        // Lógica para iniciar el chat con el trabajador seleccionado
        setShowModal(false);
        setShowChat(true);
    };

    useEffect(() => {
        const socket = io('http://localhost:3000');

        if (user !== null) {
            socket.on('connect', () => {
                const userId = user.id;
                if(userId === null) return;
                socket.emit('login', user.id);
            });
        }

        socket.on('worker_status', (status) => {
            console.log(`El trabajador ${status.workerId} está ahora ${status.online ? 'conectado' : 'desconectado'}.`);
            // Actualizar el estado de los trabajadores cuando cambia su estado
            setWorkers(prevWorkers =>
                prevWorkers.map(worker =>
                    worker.id === status.workerId ? { ...worker, online: status.online } : worker
                )
            );
        });

        socket.on('connected_users', (connUsers) => {
            // Actualizar el estado de los usuarios conectados
            console.log('connUsers',connUsers)
            console.log('workers',workers)
            setConnectedUsers(connUsers);
            console.log('workers',workers)
        });

        return () => {
            // Desconectar el socket cuando el componente se desmonta
            socket.disconnect();
        };
    }, []);

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
                            <form className={styles.searchControll}>
                                <h2 className={styles.title}>Bienvenid@ { user.firstName + ' ' + user.lastName}</h2>
                                <h3>Detalla lo que necesitas a continuación:</h3>
                                <div className={styles.searchContent}>
                                    <input className={styles.inpAddress} type="text" placeholder="Ingresa la dirección." />
                                    <div>
                        
                                        <input id="fileInput" className={styles.inpFile} type="file" />
                                      
                                        <input className={`${styles.inpAddress} ${styles.amount}`} type="number" placeholder="Ingresa el monto que ofreces" />
                                    </div>
                                </div>
                                <textarea
                                    className={styles.textarea}
                                    id="serviceDescription"
                                    name="serviceDescription"
                                    rows="5"
                                    placeholder="Describe el servicio que necesitas..."
                                />
                                <SelectGlass onSelect={setCategory} categories={categories} />
                                <ButtonGoogle clicEvent={handleSearch}/> {/* Botón para buscar trabajadores */}
                            </form>
                        </div>

                        <div >
                            {loading && <p>Cargando...</p>} {/* Mostrar mensaje de carga si loading es true */}
                            {!loading && errorMessage != "" && <p>{errorMessage}</p>} {/* Mostrar mensaje de error si hay un error */}
                            {showWorkers && !loading && !errorMessage && <WorkerCards workers={workers} onWorkerClick={handleWorkerClick} />} {/* Mostrar TableUsers solo si showWorkers es true y no hay ni carga ni error */}
                        </div>

                        {showModal && (
                            <Modal onClose={handleCloseModal}>
                                <h2>¿Deseas hablar con {selectedWorker.firstName} {selectedWorker.lastName}?</h2>
                                <button onClick={handleConfirmChat}>Confirmar</button>
                                <button onClick={handleCloseModal}>Cancelar</button>
                            </Modal>
                        )}

                        {showChat && selectedWorker && (
                            <Chat worker={selectedWorker} onClose={() => setShowChat(false)} />
                        )}
                    </div>
                ) 
            }
        </div>
    )
}

export default CustomerPanel;