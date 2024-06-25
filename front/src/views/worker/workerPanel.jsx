import React, { useEffect, useState } from "react";
import styles from "./workerPanel.module.css";
import { Link } from "react-router-dom";
import { useAuth } from '../components/authContext.jsx';
import MyAvatarEditor from "../components/avatarEditor/avatarEditor.jsx";
import { io } from 'socket.io-client';
import Chat from '../components/chat/chat2.jsx';
import CommonModal from '../components/modals/commonModal/CommonModal.jsx';
const url = process.env.REACT_APP_API_URL

const WorkerPanel = () => {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [clientInfo, setClientInfo] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [currentService, setCurrentService] = useState(null);

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

    const [requests, setRequests] = useState([]);
    useEffect(() => {
        const socket = io(`${url}`);

        if (user !== null) {
            socket.on('connect', () => {
                const userId = user.id === null;
                if (userId) return;
                socket.emit('login', user.id);
            });
        }

        if (user !== null) {
            socket.on(`chat${user.id}`, (data) => {
                if (data.workerId === user.id) {
                    //setShowModal(data.chatRequest)

                    const req = {
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        service: {
                            description: data.service.description,
                            amount: data.service.amount,
                            userLocation: data.service.userLocation
                        }
                    }
                    // Verificar si la solicitud ya existe en el estado de requests
                    setRequests(prevRequests => {
                        const exists = prevRequests.some(request => request.id === data.id);
                        if (!exists) {
                            return [...prevRequests, req];
                        }
                        return prevRequests;
                    });
                }
            })
        }

        socket.on('updateService', (data) => {
            if (data) setCurrentService(data);
        })

        return () => {
            // Desconectar el socket cuando el componente se desmonta
            socket.disconnect();
        };
    }, [user]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmChat = () => {
        setShowModal(false);
        setShowChat(true);
        console.log(clientInfo)
    };


    //onClick={() => handleAcceptChat(request)}
    const handleAcceptChat = (request) => {
        setClientInfo(request);
        setCurrentService(request.service)
        setShowChat(true);
        /*
        const socket = io('http://localhost:3000');
        socket.emit('join_private_chat', {
            workerId: user.id,
            clientId: request.id,
        });*/
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
                                <MyAvatarEditor user={user} userType="worker" />
                                <h2 className={styles.userName}>{user.name}</h2>
                                <p className={styles.userEmail}>{user.email}</p>
                            </div>
                        </div>
                        <div>
                            <div className={styles.tableContainer}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Cliente</th>
                                            <th>Descripción de la solicitud</th>
                                            <th className={styles.actionContainer}>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requests.map((request, index) => (
                                            <tr key={index}>
                                                <td>{request.firstName} {request.lastName}</td>
                                                <td>{request.service.description ?? ''}</td>
                                                <td className={styles.actionTdContainer}>
                                                    <button className={styles.chatButton} onClick={() => handleAcceptChat(request)} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z" />
                                                        </svg>
                                                        <p className={styles.text}>Aceptar Chat</p>
                                                    </button>
                                                    <button className={styles.rejButton}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                            <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                                                        </svg>
                                                        <p className={styles.text}>Rechazar Chat</p>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {showModal && (
                <CommonModal onClose={handleCloseModal} onConfirm={handleConfirmChat} user={clientInfo} />
            )}

            {showChat && clientInfo && (
                <Chat from={user} to={clientInfo} onClose={() => setShowChat(false)} service={currentService} />
            )}
        </div>
    )
}

export default WorkerPanel;