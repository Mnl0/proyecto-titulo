import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { sequelize } from './database/connection.js'
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

// app.get('/authentication', (req, res) => {
// 	res.send('login de autenticacion')
// })

// const query = 'INSERT INTO cliente_prueba (nombre_completo) VALUES (?)'

// app.post('/authentication', (req, res) => {
// 	const value = req.body.username

// 	if (value === '') {
// 		console.log('esta vacio')
// 		return

// 	}
// 	connection.query(query, [value], function (err, result) {
// 		if (err) {
// 			console.log('error en la consulta', err)
// 			return;
// 		}
// 		console.log('valor de resultados', result.affectedRows)
// 	})
// })
try {
	await sequelize.authenticate()
	console.log('conexion exitosa')
} catch (error) {
	console.error('error en la conexion', error)
}

app.listen(PORT, () => {
	console.log(`servidor corriendo en el puerto ${PORT}`)
})

