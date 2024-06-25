import express from 'express'
import dotenv from 'dotenv'
import { connection_DB } from './database/connection.js'
import { clientRouter } from './router/clientRouter.js'
import { workerRouter } from './router/workerRouter.js'
import { categoryRouter } from './router/categoryRouter.js'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { jobHistoryRouter } from './router/jobHistoryRouter.js';
import { Server } from 'socket.io'
import { createServer } from 'node:http'
dotenv.config()
const app = express()
const server = createServer(app);
const portSocketIo = process.env.PORT_SOCKET_IO;
export const io = new Server(server, {
    cors: {
        origin: portSocketIo,
        methods: ['GET, POST'],
        allowedHeaders: ['Content-Type'],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
})
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: 'image/*', limit: '100mb' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');//Content-Disposition
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
app.use('/storage', express.static(path.join(__dirname, 'storage')));

//http://localhost:3000/api/[controller]/[metodo]
app.use('/api/client', clientRouter)
app.use('/api/worker', workerRouter)
app.use('/api/category', categoryRouter)
app.use('/api/jobHistory', jobHistoryRouter)

connection_DB;

// Array para almacenar trabajadores conectados
let connectedWorkers = [];
// Exportar el objeto connectedWorkers para usarlo en el controlador
export { connectedWorkers };

// socket.io
io.on('connection', (socket) => {
    let workerId;

    // Manejar el evento de login
    socket.on('login', (id) => {
        workerId = id;
        // Actualizar el estado del trabajador como en línea
        const workerIndex = connectedWorkers.findIndex(worker => worker.id === workerId);
        if (workerIndex !== -1) {
            connectedWorkers[workerIndex].online = true;
            io.emit('worker_status', { workerId, online: true });
            io.emit('connected_users', Array.from(connectedWorkers));
        } else {
            // Si el trabajador no está en la lista, agregarlo
            connectedWorkers.push({ id: workerId, online: true });
            io.emit('worker_status', { workerId, online: true });
            io.emit('connected_users', Array.from(connectedWorkers));
        }
        //console.log(`El trabajador ${workerId} se ha conectado.`);
    });

    // Manejar el evento de desconexión
    socket.on('disconnect', () => {
        console.log('A user has disconnected!')
        // Si hay un id de trabajador, actualizar su estado a offline
        if (workerId) {
            const workerIndex = connectedWorkers.findIndex(worker => worker.id === workerId);
            if (workerIndex !== -1) {
                connectedWorkers[workerIndex].online = false;
                connectedWorkers.splice(workerIndex, 1);
                io.emit('worker_status', { workerId, online: false });
                io.emit('connected_users', Array.from(connectedWorkers));
                //console.log(`El trabajador ${workerId} se ha desconectado.`);
            }
        }
    });

    // Escuchar cambios en el estado de los trabajadores
    socket.on('worker_status', (status) => {
        console.log(`El trabajador ${status.workerId} está ahora ${status.online ? 'conectado' : 'desconectado'}.`);
    });

    socket.on('start_chat', (data) => {
        const { workerId, id, firstName, lastName, chatRequest } = data;
        //console.log(`Iniciando chat entre cliente ${clientId} y trabajador ${workerId}`);
        io.emit(`chat${workerId}`, data)
    });

    socket.on('join_private_chat', (r) => {
        const room = `room_${r}`;
        console.log(room)
        socket.join(room);
        io.to(socket.id).emit('room_joined', room);
    });

    socket.on('private message', ({ room, message, sender }) => {
        io.to(room).emit('private message', { message, sender });
    });


    // Establecer un tiempo de espera para desconexión automática si no hay interacción
    /*
    const timeout = setTimeout(() => {
        socket.disconnect();
    }, 60000); // Desconectar después de 60 segundos de inactividad

    // Limpiar el timeout cuando el trabajador se desconecta explícitamente
    socket.on('disconnect', () => {
        clearTimeout(timeout);
    });*/
});

// msg {mensaje / id }
// traer todos los mensaje de un chat ordenados por id
// controlador chat
// ruta  id
// arreglo chat en memoria o en db -> modelo pal chat
server.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})





