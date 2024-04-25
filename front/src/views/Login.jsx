import { Link } from "react-router-dom";
import estilos from './Login.module.css';
import { useState } from "react";

const Login = () => {
    const [formulario, setFormulario] = useState()

    function handleChance(evnt) {
        setFormulario({
            ...formulario,
            [evnt.target.name]: evnt.target.value
        })
    }

    function handleSubmit(evnt) {
        evnt.preventDefault()
        if (!handleValidation) {
            console.log('ver de que manera valdamos si asi o en de otra forma')
            return
        }
        fetch('http://localhost:3000/api/login/auth', {
            method: "POST",
            body: JSON.stringify(formulario),
            headers: { "Content-type": "application/json" }
        }).then(response => {
            console.log(response)
            console.log('esta es la respuesta una vez procesada la solicitud parece que hay que parsearlo')
        })

    }

    function handleValidation() {
        const { email, password } = formulario;
        if (typeof email !== 'string' || typeof password !== 'string') {
            console.log('error en el parametro de los datos')//aca deberia de pintarse los inpurt de colo r rojo
            return false
        }
        return true
    }
    return (
        <section className={estilos.loginSection}>
            <div className={estilos.loginContainer}>
                <p className={estilos.saludo}>Te damos la bienvenida nuevamente</p>
                <p>¿No tienes una cuenta? <Link className={estilos.linkRegister}>Registrarse</Link></p>
                <form onSubmit={(evnt) => handleSubmit(evnt)}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        autoComplete="off"
                        onChange={(evnt) => handleChance(evnt)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        onChange={(evnt) => handleChance(evnt)}
                    />
                    <div>
                        <div className={estilos.checkContainer}>
                            <input type="checkbox" name="recordar" className="chkRecordar" id="chkRecordar" />
                            <label htmlFor="chkRecordar">Recordar Sesión</label>
                        </div>
                        <Link className={estilos.linkRecuperar}>¿Olvidaste tu contraseña?</Link>
                    </div>
                    <button type="submit" id="btnIniciarSesion">Iniciar Sesión</button>
                    <button type="submit" id="btnIniciarSesionGoogle">Continuar con Google<svg width="18" height="18" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.9 133.5c0-10.8-.9-18.6-2.8-26.7H130.6v48.4h71.9a63.8 63.8 0 01-26.7 42.4l-.2 1.6 38.7 30 2.7.3c24.7-22.8 38.9-56.3 38.9-96" fill="#4285F4"></path><path d="M130.6 261.1c35.2 0 64.8-11.6 86.4-31.6l-41.2-32c-11 7.8-25.8 13.1-45.2 13.1a78.6 78.6 0 01-74.3-54.2l-1.5.1-40.3 31.2-.6 1.5C35.4 231.8 79.5 261 130.6 261" fill="#34A853"></path><path d="M56.3 156.4a80.4 80.4 0 01-.2-51.7V103L15.3 71.3l-1.4.6a130.7 130.7 0 000 117.3l42.4-32.8" fill="#FBBC05"></path><path d="M130.6 50.5c24.5 0 41 10.6 50.4 19.4L218 34C195.2 13 165.8 0 130.6 0 79.5 0 35.4 29.3 13.9 72l42.2 32.7a79 79 0 0174.4-54.2" fill="#EB4335"></path></svg></button>
                </form>
            </div>
        </section>
    )
}

export default Login;