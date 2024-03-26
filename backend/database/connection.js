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