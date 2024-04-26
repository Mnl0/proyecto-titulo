import { workerSchema, searchEmail } from "../models/workerModel.js";
import { scrypt, randomBytes, randomUUID } from 'node:crypto'

//deberia usar Schema como prefijo en los modelos???
export const workerController = {
	auth: async (req, res) => {
		const emailBuscar = "email@email.com"
		const password = '12345'
		const item = await searchEmail(emailBuscar)
		if (item === null) {
			return res.sendStatus(400)
		}
		const pass = item.toJSON().wr_contrasena
		//fijarse en el tipo de dato
		if (pass.toString() === password) {
			return res.json(item)//eliminar atributos que no sirven
		} else {
			return res.sendStatus(400)
		}
	}
}