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
export const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET, POST, PUT, DELETE, OPTIONS, PATCH'],
		allowedHeaders: ['Cntent-Type']
	}
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

io.on('connection', (socket) => {
	socket.on('join', (roomId) => {
		socket.join(roomId);
		console.log(`Cliente unido a la sala: ${roomId}`);
	})
	socket.on('chat-privado', ({ roomId, message, id }) => {
		console.log(`Mensaje en sala ${roomId}: ${message}, ${id}`);
		io.to(roomId).emit('chat-privado', message);
	})
	socket.on('disconnect', () => {
		console.log('Cliente desconetado');
	})
})
// msg {mensaje / id }
// traer todos los mensaje de un chat ordenados por id
// controlador chat
// ruta  id
// arreglo chat en memoria o en db -> modelo pal chat
server.listen(PORT, () => {
	console.log(`servidor corriendo en el puerto ${PORT}`)
})

