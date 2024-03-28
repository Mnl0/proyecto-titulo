import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
dotenv.config()

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASS;
const database = process.env.DATABASE;
const port = process.env.DB_PORT;

export const sequelize = new Sequelize({
	dialect: 'mysql',
	host: host,
	username: user,
	password: password,
	database: database,
	port: port,
})

export const connexionDB = sequelize.authenticate()

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