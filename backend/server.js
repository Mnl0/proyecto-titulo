import express from 'express'
import dotenv from 'dotenv'
import { connection } from './database/connection.js'
import cors from 'cors'
// import { Cliente } from './models/clienteModel.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
	{
		origin: '*',
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		// exposedHeaders: ['header-personalizado'],
		// maxAge: 10000,//tiempo en segundos que se va a guardar la peticion
	}
))

// app.use('*', (req, res, next) => {
// 	res.setHeader('Content-Type', 'application/json')
// 	res.setHeader('Access-Control-Allow-Origin', '*')
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
// })

app.get('/authentication', (req, res) => {
	res.send('login de autenticacion')
})

const query = 'INSERT INTO cliente_prueba (nombre_completo) VALUES (?)'

app.post('/authentication', (req, res) => {
	const value = req.body.username

	if (value === '') {
		console.log('esta vacio')
		return

	}
	connection.query(query, [value], function (err, result) {
		if (err) {
			console.log('error en la consulta', err)
			return;
		}
		console.log('valor de resultados', result.affectedRows)
	})
})


app.listen(PORT, () => {
	console.log(`servidor corriendo en el puerto ${PORT}`)
	connection.connect(function (err) {
		if (err) {
			console.log('error de conexion')
			return;
		}
		console.log('conexion establecida')
	})
})

