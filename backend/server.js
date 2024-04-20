import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connection_DB } from './database/connection.js'
import { clientRouter } from './router/clientRouter.js'
import { workerRouter } from './router/workerRouter.js'
import { categoryRouter } from './router/categoryRouter.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
	{
		origin: '*',
		methods: ['GET', 'POST', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}
))
//ruta completa seria http://localhost:3000/api/login/auth
app.use('/api/login', clientRouter)//verificar los nombres(MVC) que sean consistentes
app.use('/api/login2', workerRouter)
app.use('/get/cat', categoryRouter)

connection_DB;

app.listen(PORT, () => {
	console.log(`servidor corriendo en el puerto ${PORT}`)
})

