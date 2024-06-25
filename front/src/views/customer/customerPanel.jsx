import React, { useEffect, useState } from "react";
import styles from "./customerPanel.module.css";
//import { FaUser, FaPowerOff } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from '../components/authContext.jsx';
import SelectGlass from '../components/selects/selectGlass.jsx';
import { ButtonGoogle } from "../components/buttons/buttonGoogle.jsx";
import MyAvatarEditor from "../components/avatarEditor/avatarEditor.jsx";
import WorkerCards from '../components/workerCards/WorkerCards.jsx';
import CommonModal from '../components/modals/commonModal/CommonModal.jsx';
import Chat from '../components/chat/chat2.jsx';
import { io } from 'socket.io-client';
const url = process.env.REACT_APP_API_URL;

const CustomerPanel = () => {
    const { user } = useAuth();
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

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(okey, error);
        } else {
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
        switch (err.code) {
            case err.PERMISSION_DENIED: msg = 'No has permitido localizarte.'; break;
            case err.POSITION_UNAVAILABLE: msg = 'Tu posición no está disponible.'; break;
            case err.TIMEOUT: msg = 'Tiempo de espera superado. Vuelve a intentarlo.'; break;
            default: msg = 'Error desconocido'; break;
        }
        console.log(msg);
    }

    const [formData, setFormData] = useState({});
    const handleInputChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            idCliente: user.id,
            [e.target.name]: e.target.value
        }));
        storageItem(formData)
    };
    const sendFormData = async () => {
        try {
            const response = await fetch(`${url}/api/jobHistory/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar los datos del servicio.');
            }

            const data = await response.json();

            console.log('Datos del servicio guardados correctamente.', data);
        } catch (error) {
            console.error('Error al guardar los datos del servicio:', error);
            // Aquí podrías manejar el error de alguna manera, como mostrando un mensaje al usuario
        }
    };


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${url}/api/category/getAll`);
                if (!response.ok) throw new Error('No se pudieron cargar las categorías');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
        fetchCategories();
    }, []);

    function storageItem(item) {
        const i = item;
        localStorage.setItem("service", JSON.stringify(i));
    }
    function retrieveStoredItem(item) {
        const isItem = localStorage.getItem(item);
        if (isItem) {
            const storedItem = JSON.parse(isItem);
            return storedItem;
        }
        return false;
    }
    function deleteStoredItem(item) {
        localStorage.removeItem(item);
    }

    useEffect(() => {
        const retrieveService = retrieveStoredItem('service');
        if (retrieveService) {
            setFormData({
                ...formData,
                description: retrieveService.description, // Establece la descripción del servicio desde localStorage
                amount: retrieveService.amount,
                userLocation: retrieveService.userLocation
            });
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true); // Iniciar el estado de carga
        try {
            /* // Enviar los datos del formulario al servidor primero
             await sendFormData();
             console.log(formData)*/
            storageItem(formData)

            const response = await fetch(`${url}/api/worker/getAllForOccupation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category })
            });

            if (!response.ok) throw new Error('No se pudieron cargar los trabajadores.');
            const data = await response.json();
            if (data.length > 0) {
                setWorkers(data);
                setShowWorkers(true);
                setErrorMessage("");
            } else {
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
    const [service, setService] = useState({});
    useEffect(() => {
        if (showChat) {
            const socket = io(`${url}`);
            const obj = {
                workerId: selectedWorker.id,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                chatRequest: showChat,
                service: formData ?? {}
            }
            setService(obj)
            socket.emit('start_chat', obj);
        }
    }, [showChat])

    useEffect(() => {
        const socket = io(`${url}`);

        if (user !== null) {
            socket.on('connect', () => {
                const userId = user.id;
                if (userId === null) return;
                socket.emit('login', user.id);
            });
        }

        socket.on('worker_status', (status) => {
            // Actualizar el estado de los trabajadores cuando cambia su estado
            setWorkers(prevWorkers =>
                prevWorkers.map(worker =>
                    worker.id === status.workerId ? { ...worker, online: status.online } : worker
                )
            );
        });

        socket.on('connected_users', (connUsers) => {
            // Actualizar el estado de los usuarios conectados
            setConnectedUsers(connUsers);
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
                                <h2 className={styles.title}>Bienvenid@ {user.firstName + ' ' + user.lastName}</h2>
                                <h3>Detalla lo que necesitas a continuación:</h3>
                                <div className={styles.searchContent}>
                                    <input value={formData.userLocation || ''} onChange={handleInputChange} className={styles.inpAddress} name="userLocation" type="text" placeholder="Ingresa la dirección." />
                                    <div>

                                        <input id="fileInput" className={styles.inpFile} type="file" />

                                        <input value={formData.amount || ''} onChange={handleInputChange} className={`${styles.inpAddress} ${styles.amount}`} name="amount" type="number" placeholder="Ingresa el monto que ofreces" />
                                    </div>
                                </div>
                                <textarea
                                    className={styles.textarea}
                                    id="serviceDescription"
                                    name="description"
                                    rows="5"
                                    placeholder="Describe el servicio que necesitas..."
                                    onChange={handleInputChange}
                                    value={formData.description || ''}
                                />
                                <SelectGlass onSelect={setCategory} categories={categories} />
                                <ButtonGoogle clicEvent={handleSearch} text="Buscar Trabajador" /> {/* Botón para buscar trabajadores */}
                            </form>
                        </div>

                        <div >
                            {loading && <p>Cargando...</p>} {/* Mostrar mensaje de carga si loading es true */}
                            {!loading && errorMessage != "" && <p>{errorMessage}</p>} {/* Mostrar mensaje de error si hay un error */}
                            {showWorkers && !loading && !errorMessage && <WorkerCards workers={workers} onWorkerClick={handleWorkerClick} />} {/* Mostrar TableUsers solo si showWorkers es true y no hay ni carga ni error */}
                        </div>

                        {showModal && (
                            <CommonModal onClose={handleCloseModal} onConfirm={handleConfirmChat} user={selectedWorker} />
                        )}

                        {showChat && selectedWorker && (
                            <Chat from={user} to={selectedWorker} onClose={() => setShowChat(false)} service={service.service} />
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default CustomerPanel;