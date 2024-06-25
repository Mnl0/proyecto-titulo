import React from "react";
import styles from './customerFormRegister.module.css';
import { useState } from "react";
import { useAuth } from '../components/authContext.jsx';  // importar authcontext desde su ubicación
import { Link, useNavigate } from "react-router-dom";
const url = process.env.REACT_APP_API_URL;


const CustomerRegister = () => {
    const [inputValues, setInputValues] = useState({});

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleValues = (e) => {
        setInputValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        //console.log(inputValues)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('front: ', inputValues)
            const response = await fetch(`${url}/api/client/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValues)
            });

            console.log('RESPUESTA', response);

            if (response.ok) {
                const user = await response.json();
                login(user);  // Actualiza el contexto con los datos del usuario
                navigate('/customerpanel');  // Redirecciona al usuario

            } else {
                console.error('Error de autenticación', response.statusText);
            }

        } catch (error) {
            console.error('Error en el fecth login: ', error);
        }
    };

    return (
        <div className={styles.global}>
            <div className={styles.card}>
                <h4 className={styles.title}>Regístrate como Cliente!</h4>
                <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM325.8 139.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-21.4 21.4-71-71 21.4-21.4c15.6-15.6 40.9-15.6 56.6 0zM119.9 289L225.1 183.8l71 71L190.9 359.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" /></svg>
                        <input onChange={handleValues} id="firstName" placeholder="Nombre" className={styles.inputField} name="firstName" type="text" />
                    </div>

                    <div className={styles.field}>
                        <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                        <input onChange={handleValues} id="lastName" placeholder="Apellido" className={styles.inputField} name="lastName" type="text" />
                    </div>

                    <div className={styles.field}>
                        <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8H224V432c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z" /></svg>
                        <input onChange={handleValues} id="address" placeholder="Dirección" className={styles.inputField} name="address" type="text" />
                    </div>

                    <div className={styles.field}>
                        <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                        <input onChange={handleValues} id="cellPhone" placeholder="Phono" className={styles.inputField} name="cellPhone" type="number" />
                    </div>

                    <div className={styles.field}>
                        <svg className={styles.inputIcon} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                            <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path></svg>
                        <input onChange={handleValues} id="email" placeholder="Email" className={styles.inputField} name="email" type="email" />
                    </div>

                    <div className={styles.field}>
                        <svg className={styles.inputIcon} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                            <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path></svg>
                        <input onChange={handleValues} id="password" placeholder="Contraseña" className={styles.inputField} name="password" type="password" />
                    </div>

                    <div className={styles.field}>
                        <svg className={styles.inputIcon} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                            <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path></svg>
                        <input onChange={handleValues} id="password2" placeholder="Confirmar Contraseña" className={styles.inputField} name="password2" type="password" />
                    </div>

                    <button className={styles.btn} type="submit">Registrarse</button>
                    <a href="#" className={styles.btnLink}>Olvidaste tu contraseña?</a>
                </form>
            </div>
        </div>
    )
}

export default CustomerRegister;