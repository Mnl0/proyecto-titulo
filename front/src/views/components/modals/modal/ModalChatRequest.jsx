import React from 'react';
import styles from './ModalChatRequest.module.css';

const Modal = ({ children, onClose }) => {
    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
            
        </div>
    );
};

export default Modal;
