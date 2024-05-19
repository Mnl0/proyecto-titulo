//import { Link } from "react-router-dom";
import styles from './register.module.css';
import imgCustomers from './customers.jpeg';
import imgWorkers from './workers.jpeg';
import { useState } from "react";
import CustomerRegister from './customerRegister.jsx';
import WorkersRegister from './workersRegister.jsx';

const Register = () => {

    const [userType, setUserType] = useState(null);

    const handleUserType = (type) => {
        setUserType(type);
    }

    return (
        <div className={styles.registerSection}>
            <div className={styles.cardContainer}>
                <div className={styles.card} onClick={() => {handleUserType('customer')}}>
                    <img src={imgCustomers} alt='Cliente' />
                    <h2>Registrarse como Cliente</h2>
                    <p>Seleccione esta opción si desea utilizar nuestros servicios como cliente.</p>
                </div>
                <div className={styles.card} onClick={() => {handleUserType('worker')}}>
                    <img src={imgWorkers} alt="Trabajador" />
                    <h2>Registrarse como Trabajador</h2>
                    <p>Seleccione esta opción si desea ofrecer sus servicios como trabajador.</p>
                </div>
            </div>

            {
                userType &&
                    <div className={styles.handleContainer}>
                        {userType === 'customer' && <CustomerRegister />}
                        {userType === 'worker' && <WorkersRegister />}
                    </div>
            }
        </div>
    )
}

export default Register;