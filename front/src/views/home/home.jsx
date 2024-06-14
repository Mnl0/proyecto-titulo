import styles from "./home.module.css";
import UIhome from "./uihome.jsx";
import CustomerLogin from '../customer/customerLogin.jsx';
import WorkerLogin from '../worker/workerLogin.jsx';

const Home = ({ formToShow, setFormToShow }) => {

    const handleCustomerLogin = () => {
        setFormToShow("customer");
    }

    const handleWorkerLogin = () => {
        setFormToShow("worker");
    }

    return (
        <div className={styles.globalHome}>
            <div className={styles.nine}>
                <h1>Bienvenido a WorkWise<span>LVM Solutions</span></h1>
            </div>

            {
                formToShow === "customer" ? <CustomerLogin /> :
                formToShow === "worker" ? <WorkerLogin /> : (
                    <div>
                        <UIhome onClick={handleCustomerLogin} title="Iniciar como Cliente"/>
                        <UIhome onClick={handleWorkerLogin} title="Iniciar como Trabajador" />
                    </div>
                )
            }
        </div>
    )
}

export default Home;