import { hashingPassword, checkPassword, searchBeforeRecover, updatePassword, searchForEmail, searchForId } from '../models/clientModel.js'

export const clientController = {

	auth: async (req, res) => {
		const { cl_password, cl_email } = req.validateBody

		const item = await searchForEmail(cl_email, 'email');
		if (!item) {
			return res.status(400).json();
		}

		const result = checkPassword(cl_password, item.cl_password);
		if (!result) {
			return res.status(400).json();
		}

		const itemProfile = {
			...item.toJSON()
		}
		res.status(200).json(itemProfile)
	},
	/*==========Enviar del body el tipo cl o wr y pasar como argumento al searchEmail=====================*/
	create: async (req, res) => {
		const { cl_email, cl_firtName, cl_password, cl_lastName, cl_cellphone, cl_direccion } = req.validateBody;

		const item = await searchForEmail(cl_email, 'email');
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

		const data = await createClient(newItem);
		if (data === null) {
			return res.sendStatus(409);
		}
		delete data.cl_password;
		delete data.cl_passwordSinScriptar;
		delete data.cl_updatedAt;
		delete data.cl_createdAt;
		res.json(data.toJSON());

	},

	validateIfRecoverPass: async (req, res) => {
		const clientRecover = await searchBeforeRecover(req.validateBody);
		if (!clientRecover) {
			return res.sendStatus(400);
		}
		res.status(200).send(clientRecover.cl_id);
	},

	recoverPass: async (req, res) => {
		const newPass = await updatePassword(req.validateBody);
		if (newPass === 0) {
			return res.sendStatus(400);
		}
		res.sendStatus(200);
	},

	getProfile: async (req, res) => {
		const { id } = req.params
		const item = await searchForId(id, 'id');
		if (!item) {
			return res.sendStatus(400);
		}
		res.status(200).send(item.toJSON());
	},

	editProfile: async (req, res) => {
		console.log('llegue al controlador para editar el perfil')
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

}