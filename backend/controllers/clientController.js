import { create, hashingPassword, searchEmail, validatePassword } from '../models/clientModel.js'

export const clientController = {
	auth: async (req, res) => {
		try {
			const { cl_password } = req.body
			const item = await searchEmail(req.body.cl_email);

			if (!item) return res.status(400).json();

			const result = validatePassword(cl_password, item.cl_password);
			if (!result) return res.status(400).json();

			const itemProfile = {
				fullName: item.cl_firtName + ' ' + item.cl_lastName,
				email: item.cl_email,
				latitude: item.cl_latitude,
				longitude: item.cl_longitude
			}
			res.status(200).json(itemProfile)

		} catch (ex) {
			res.status(500).json({ message: 'Ocurrió algo inesperado', ex });
		}
	},
	/*==========Enviar del body el tipo cl o wr y pasar como argumento al searchEmail=====================*/
	create: async (req, res) => {
		const { cl_email, cl_firtName, cl_password, cl_lastName, cl_cellphone, cl_direccion } = req.body;

		const item = await searchEmail(cl_email);
		if (item) {
			return res.sendStatus(409)
		}

		const [salt, hashedPassword] = hashingPassword(cl_password);

		const newItem = {
			cl_email,
			cl_firtName,
			cl_password: `${salt}:${hashedPassword}`,
			cl_passwordSinScriptar: cl_password,
			cl_lastName,
			cl_cellphone,
			cl_direccion,
		}

		const data = await create(newItem);
		if (data === null) {
			return res.sendStatus(409);
		}
		delete data.cl_password;
		delete data.cl_passwordSinScriptar;
		delete data.cl_updatedAt;
		delete data.cl_createdAt;
		res.json(data.toJSON());

	},

	//=====no delete cambiar por desactivar=======//
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