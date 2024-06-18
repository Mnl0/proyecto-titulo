import styles from './chat.module.css';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';


const Chat2 = ({ userId, partnerId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.emit('join_private_chat', { userId1: userId, userId2: partnerId });

    socket.on('room_joined', (room) => {
      console.log(`Unido a la sala ${room}`);
    });

    socket.on('mensaje', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('mensaje');
      socket.off('room_joined');
    };
  }, [socket, userId, partnerId]);

  const sendMessage = () => {
    if (message.trim()) {
      const room = `room_${userId}_${partnerId}`;
      socket.emit('mensaje', { room, message });
      setMessage('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.cardcontainer}>
        <div className={styles.cardheader}>
          <div className={styles.imgavatar}></div>
          <div className={styles.textchat}>Chat</div>
          <button onClick={onClose} className={styles.closeButton}>X</button>
        </div>
        <div className={styles.cardbody}>
          <div className={styles.messagescontainer}>
            {messages.map((msg, index) => (
              <div key={index} className={styles.messagebox}>
                <p>{msg}</p>
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
