import styles from './chat.module.css';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('mensaje', (data) => {
          setMessages((prevMessages) => [...prevMessages, data]);
        });
    
        return () => {
          socket.off('mensaje');
        };
      }, []);
    
      const sendMessage = () => {
        if (message.trim()) {
          socket.emit('mensaje', message);
          setMessage('');
        }
      };

    return (
        <div className={styles.cardcontainer}>
            <div className={styles.cardheader}>
                <div className={styles.imgavatar}></div>
                <div className={styles.textchat}>Chat</div>
            </div>
            <div className={styles.cardbody}>
                <div className={styles.messagescontainer}>
                <div className={`${styles.messagebox} ${styles.left}`}>
                <p>Hello, How are you?</p>
                </div>
                <div className={`${styles.messagebox} ${styles.right}`}>
                <p>I'm good, thanks for asking! How about you?</p>
                </div>
                </div>
                <div className={styles.messageinput}>
               
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here" className={styles.messagesend}></textarea>
                <button onClick={sendMessage} className={styles.buttonsend}>Enviar</button>
              
                </div>
            </div>
        </div>
    )
}

export default Chat;