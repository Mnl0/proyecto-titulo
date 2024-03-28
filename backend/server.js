import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { sequelize } from './database/connection.js'
import { Cliente } from './models/clienteModel.js'
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

app.get('/authentication', (req, res) => {
	res.send('login de autenticacion')
})

const query = `INSERT INTO cliente_pruebas (nombre_completo) VALUES (?)`
app.post('/authentication', (req, res) => {
	const { username } = req.body
	console.log(username)

	if (username.length === 0) {
		console.log('esta vacio')
		return
	}
	// Cliente.sequelize.query(query, {
	// 	replacements: [value]
	// }).then((newUser) => {
	// 	console.log('valor de new user', newUser)
	// }).catch((error) => {
	// 	console.log('error al insertar', error)
	// })
	Cliente.create({ id: 3, nombre_completo: username })
		.then((newUser) => {
			newUser.save()
			console.log(newUser.toJSON())
		}).catch((error) => {
			console.log('error al insertar', error)
		})
})

try {
	await sequelize.authenticate()
	console.log('conexion exitosa')
} catch (error) {
	console.error('error en la conexion', error)
}

app.listen(PORT, () => {
	console.log(`servidor corriendo en el puerto ${PORT}`)
})

