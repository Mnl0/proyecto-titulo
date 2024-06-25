import React, { useEffect, useState } from "react";
import styles from './ServiceForm.module.css';
import { ButtonGoogle } from "../buttons/buttonGoogle.jsx";
const url = process.env.REACT_APP_API_URL;

const ServiceForm = ({ customer, worker }) => {
    const [formData, setFormData] = useState({});
    const handleInputChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            customerId: customer.id,
            workerId: worker.id,
            [e.target.name]: e.target.value
        }));
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

    return (
        <form className={styles.searchControll}>
            <div className={styles.searchContent}>
                <input value={formData.userLocation || ''} onChange={handleInputChange} className={styles.inpAddress} name="userLocation" type="text" placeholder="Ingresa la dirección." />
                <div>
                    <input value={formData.amount || ''} onChange={handleInputChange} className={`${styles.inpAmount} ${styles.amount}`} name="amount" type="number" placeholder="Ingresa el monto que ofreces" />
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
            <ButtonGoogle clicEvent={sendFormData} text="Guardar" /> {/* Botón para buscar trabajadores */}
        </form>
    )
}

export default ServiceForm;