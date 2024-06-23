import {React, useState} from "react";
import styles from './CommonModal.module.css';


const CommonModal = ({ onClose, onConfirm, user }) => {
    const [selectedWorker, setSelectedWorker] = useState(user);


    return (
        <div  className={styles.modalBackdrop} >
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <div className={styles.modalBody}>
                    <h2>¿Deseas hablar con {selectedWorker.firstName} {selectedWorker.lastName}?</h2>
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default CommonModal;