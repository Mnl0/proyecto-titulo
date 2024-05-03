//import { Link } from "react-router-dom";
import estilos from './Register.module.css';
import ImgReg2 from '../img/img-reg2.jpeg';
import ImgReg from '../img/img-reg.jpeg';
import { useState } from "react";
import RegisterCustomer from './RegisterCustomer';
import RegisterWorker from './RegisterWorker';

const Register = () => {

    const [userType, setUserType] = useState(null);

    const handleUserType = (type) => {
        setUserType(type);
    }

    return (
        <div className={estilos.registerSection}>
            <div className={estilos.cardContainer}>
                <div className={estilos.card} onClick={() => {handleUserType('customer')}}>
                    <img src={ImgReg2} alt='Cliente' />
                    <h2>Registrarse como Cliente</h2>
                    <p>Seleccione esta opción si desea utilizar nuestros servicios como cliente.</p>
                </div>
                <div className={estilos.card} onClick={() => {handleUserType('worker')}}>
                    <img src={ImgReg} alt="Trabajador" />
                    <h2>Registrarse como Trabajador</h2>
                    <p>Seleccione esta opción si desea ofrecer sus servicios como trabajador.</p>
                </div>
            </div>

            {
                userType &&
                    <div className={estilos.handleContainer}>
                        {userType === 'customer' && <RegisterCustomer />}
                        {userType === 'worker' && <RegisterWorker />}
                    </div>
            }
        </div>
    )
}

export default Register;