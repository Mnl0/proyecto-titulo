import styles from './chat.module.css';
import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import ServiceForm from '../serviceForm/ServiceForm.jsx';
const ulr = process.env.REACT_APP_API_URL;

const Chat2 = ({ from, to, onClose, service }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesContainerRef = useRef(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    setCustomer(from.category ?? null);
    console.log('CUSTOMER', customer)
  }, [])

  const socket = io(`${ulr}`, {
    reconnection: true,
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 5,
  });
  const room = [from.id, to.id].sort().join('_'); // Crear una sala consistente

  useEffect(() => {
    socket.emit('join_private_chat', room);

    socket.on('room_joined', (room) => {
      console.log(`Unido a la sala ${room}`);
    });

    socket.on('private message', ({ message, sender }) => {
      setMessages((prevMessages) => [...prevMessages, { message, sender }]);
    });

    return () => {
      socket.off('private message');
      socket.off('room_joined');
    };
  }, [from, to, room, service]);

  const sendMessage = () => {
    if (message.trim()) {
      const room = `room_${[from.id, to.id].sort().join('_')}`;
      socket.emit('private message', { room, message, sender: from.id });
      setMessage('');
    }
  };

  const handleModalClose = () => {
    onClose(); // Cerrar el modal de chat
    socket.emit('leave_private_chat', room); // Emitir evento al cerrar el chat
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <ServiceForm service={service} />
      <div className={styles.cardcontainer}>
        <div className={styles.cardheader}>
          <div className={styles.imgavatar}></div>
          <div className={styles.textchat}>Estás chateando con {to.firstName}</div>
          <button onClick={handleModalClose} className={styles.closeButton}>X</button>
        </div>
        <div className={styles.cardbody}>
          <div className={styles.messagescontainer} ref={messagesContainerRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.messagebox} ${msg.sender === from.id ? `${styles.messageboxFrom} ${styles.right}` : `${styles.messageboxTo} ${styles.left}`}`}>
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
          <div className={styles.messageinput}>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here" className={styles.messagesend}></textarea>
            <button onClick={sendMessage} className={styles.buttonsend}>Enviar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat2;
