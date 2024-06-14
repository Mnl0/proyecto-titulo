import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
dotenv.config()

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASS;
const database = process.env.DATABASE;
const port = process.env.DB_PORT;

export const sequelize = new Sequelize({
	dialect: 'mysql',//se pueden usar diferentes bases de datos
	host: host,
	username: user,
	password: password,
	database: database,
	port: port,
	freezeTableName: true, //definimos de manera general que no pluralizara las tablas
})

export const connection_DB = sequelize.authenticate().then(() => {
	console.log('Conexion exitosa')
	sequelize.sync()//sincronizo todo los modelos
	//sequelize.drop()// elimina todo los modelos
	//sequelize.sync({ alter: true }) //compara y actualiza los modelos
}).catch((error) => {
	console.error('Error en la conexion', error)
})

