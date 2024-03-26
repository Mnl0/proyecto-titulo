import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

export const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASS,
	database: process.env.DATABASE,
	port: process.env.DB_PORT
})


// const query = 'SELECT * FROM cliente_prueba'
// connection.query(query, function (err, rows, fields) {
// 	if (err) {
// 		console.log('error en la consulta', err)
// 		return;
// 	} else {
// 		rows.forEach(row => {
// 			console.log(row)
// 		})
// 	}
// })