import { workerSchema } from "../models/workerModel.js";
import { scrypt, randomBytes, randomUUID } from 'node:crypto'

//deberia usar Schema como prefijo en los modelos???
export const workerController = {
	create: (req, res) => {
		console.log('llege al controlador')
	}
}