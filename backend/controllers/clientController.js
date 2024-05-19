import { create, searchEmail } from '../models/clientModel.js'
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export const clientController = {
	auth: async (req, res) => {
		try{
			const { cl_email, cl_password } = req.body
			const item = await searchEmail(req.body.cl_email);
			//if (item === null || item === undefined || item === '' || typeof item !== 'string') {console.log('hola mundo 400 1');return res.status(400).json();}
			if(!item) return res.status(400).json();

			const [salt, key] = item.cl_password.split(':');
			const hashedBuffer = scryptSync(cl_password, salt, 64);
			const keyBuffer = Buffer.from(key, 'hex');
			const match = timingSafeEqual(hashedBuffer, keyBuffer);
			if(!match) return res.status(400).json();

			const itemProfile = {
				fullName: item.cl_firtName + ' ' + item.cl_lastName,
				email: item.cl_email,
				latitude: item.cl_latitude,
				longitude: item.cl_longitude
			}
			res.status(200).json(itemProfile)
			
		}catch(ex){
			res.status(500).json({ message: 'Ocurrió algo inesperado', ex });
		}
	},
	create: async (req, res) => {
		/*==========Enviar del body el tipo cl o wr y pasar como argumento al searchEmail=====================*/
		const { cl_email, cl_firtName, cl_password, cl_lastName, cl_cellphone, cl_latitude, cl_longitude } = req.body;
		/*=============agregar las validaciones de todos los campos =========*/
		const item = await searchEmail(cl_email);
		if (item) {
			return res.sendStatus(409)
		}
		const salt = randomBytes(16).toString('hex');
		const hashedPassword = scryptSync(cl_password, salt, 64).toString('hex');

		const newItem = {
			/*=================ver si vamos a solicitar mas datos para registrarse============================*/
			cl_email,
			cl_firtName,
			cl_password: `${salt}:${hashedPassword}`,
			cl_passwordSinScriptar: cl_password,
			cl_lastName,
			cl_cellphone,
			cl_latitude,
			cl_longitude
		}

		const data = await create(newItem);
		if (data === null) {
			/*===========corroborar los mensajes de error =========================*/
			return res.sendStatus(409);
		}
		delete data.cl_password;
		delete data.cl_passwordSinScriptar;
		delete data.cl_updatedAt;
		delete data.cl_createdAt;
		res.json(data.toJSON());

	},
	delete: (req, res) => {
		const { id } = req.params
		if (id === '') return
		if (id === undefined) return

		const deleteQuery = 'DELETE FROM client WHERE emailclient = ?'//cambiar por el ID
		ClientSchema.sequelize.query(deleteQuery, {
			replacements: [id],
			type: ClientSchema.sequelize.QueryTypes.DELETE
		}).then((resp) => {
			res.status(200).json({ message: 'usuario eliminado', data: resp })
		}).catch((error) => {
			res.status(500).json({ message: 'ocurrio algo inesperado', error: error })
		})

	},
	get: (req, res) => {
		console.log('llegue al controlador')
		console.log(req.body)
	}
}
//localhost:3000/login/authentication