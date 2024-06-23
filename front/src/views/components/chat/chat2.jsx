import styles from './chat.module.css';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


const Chat2 = ({ from, to, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const socket = io('http://localhost:3000', {
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
      setMessages((prevMessages) => [...prevMessages, {message,sender}]);
    });

    return () => {
      socket.off('private message');
      socket.off('room_joined');
    };
  }, [from, to]);

  const sendMessage = () => {
    if (message.trim()) {
      const room = `room_${[from.id, to.id].sort().join('_')}`;
      socket.emit('private message', { room, message, sender: from.id });
      setMessage('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.cardcontainer}>
        <div className={styles.cardheader}>
          <div className={styles.imgavatar}></div>
          <div className={styles.textchat}>Estas chateando con {to.firstName}</div>
          <button onClick={onClose} className={styles.closeButton}>X</button>
        </div>
        <div className={styles.cardbody}>
          <div className={styles.messagescontainer}>
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
  )
}

export default Chat2;
