import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connexionDB } from './database/connection.js'
import { clienteRouter } from './routes/routes.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
	{
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	}
))
//ruta completa seria http://localhost:3000/login/auth
app.use('/login', clienteRouter)//verificar los nombres(MVC) que sean consistentes

//verificar como queda mejor
connexionDB.then(() => {
	console.log('conexion exitosa')
}).catch((error) => {
	console.error('error en la conexion', error)
})

app.listen(PORT, () => {
	console.log(`servidor corriendo en el puerto ${PORT}`)
})

