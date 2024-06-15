import express from 'express'
import dotenv from 'dotenv'
import { connection_DB } from './database/connection.js'
import { clientRouter } from './router/clientRouter.js'
import { workerRouter } from './router/workerRouter.js'
import { categoryRouter } from './router/categoryRouter.js'
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { jobHistoryRouter } from './router/jobHistoryRouter.js';

dotenv.config()

const app = express()
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

//ruta completa seria
//http://localhost:3000/api/[controller]/[metodo]
app.use('/api/client', clientRouter)
app.use('/api/worker', workerRouter)
app.use('/api/category', categoryRouter)
app.use('/api/jobHistory', jobHistoryRouter)

connection_DB;

app.listen(PORT, () => {
	console.log(`servidor corriendo en el puerto ${PORT}`)
})

