import { searchEmail, create } from "../models/workerModel.js";
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto'

//deberia usar Schema como prefijo en los modelos???
export const workerController = {
	auth: async (req, res) => {
		const { wr_email, wr_password } = req.body;

		const item = await searchEmail(wr_email)
		if (item === null) {
			return res.sendStatus(400)
		}

		const [salt, key] = item.wr_password.split(':');
		const hashedBuffer = scryptSync(wr_password, salt, 64);
		const keyBuffer = Buffer.from(key, 'hex');
		const match = timingSafeEqual(hashedBuffer, keyBuffer);

		if (match) {
			const itemProfile = {
				...item.toJSON()
			}
			/*=========verificar si es necesario eliminar este id puede servir en el front===================*/
			delete itemProfile.wr_id;
			res.json(itemProfile)
		} else {
			res.sendStatus(400)
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