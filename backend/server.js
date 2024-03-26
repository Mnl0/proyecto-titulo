import express from 'express'
import dotenv from 'dotenv'
import { connection } from './database/connection.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

///estudiar bien los cors
// app.use('/pathEspecifica', (req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
// 	next();
// });

const query = 'SELECT * FROM cliente_prueba'
connection.query(query, function (err, rows, fields) {
	if (err) {
		console.log('error en la consulta', err)
		return;
	} else {
		rows.forEach(row => {
			console.log(row)
		})
	}
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

