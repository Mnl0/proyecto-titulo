import { searchEmail, create } from "../models/workerModel.js";
import { scryptSync, randomBytes } from 'node:crypto'

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
	},
	create: async (req, res) => {
		const { wr_firtName, wr_lastName, wr_email, wr_password, wr_cellphone, wr_latitude, wr_longitude } = req.body;
		/*======agregar las validaciones de todos los campos======*/
		const item = await searchEmail(wr_email);
		if (item) {
			return res.sendStatus(409);
		}
		const salt = randomBytes(16).toString('hex');
		const hashedPassword = scryptSync(wr_password, salt, 64).toString('hex');

		const newItem = {
			/*=================ver si vamos a solicitar mas datos para registrarse============================*/
			wr_email,
			wr_firtName,
			wr_password: `${salt}:${hashedPassword}`,
			wr_passwordSinScriptar: wr_password,
			wr_lastName,
			wr_cellphone,
			wr_latitude,
			wr_longitude
		}

		const data = await create(newItem);
		if (data === null) {
			/*======verificar los codigos de respues======*/
			return res.sendStatus(409);
		}
		delete data.wr_password;
		delete data.wr_passwordSinScriptar;
		delete data.wr_updatedAt;
		delete data.wr_createdAt;
		res.json(data.toJSON());
	}
}