import React from "react";


const CommonModal = () => {
    const [showModal, setShowModal] = useState(false); // Estado para la visibilidad del modal

    const handleCloseModal = () => {
        setShowModal(false);
    };
    
    const handleConfirmChat = () => {
        // Lógica para iniciar el chat con el trabajador seleccionado
        setShowModal(false);
        setShowChat(true);
    };

    return (
        <div onClose={handleCloseModal}>
            <h2>¿Deseas hablar con {selectedWorker.firstName} {selectedWorker.lastName}?</h2>
            <button onClick={handleConfirmChat}>Confirmar</button>
            <button onClick={handleCloseModal}>Cancelar</button>
        </div>
    )
}

export default CommonModal;