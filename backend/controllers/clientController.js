import { hashingPassword, checkPassword, searchBeforeRecover, updatePassword, searchForEmail, searchForId, addImageOrEditInBd, addImageOrEditInServer, getImageFromServer } from '../models/clientModel.js'

export const clientController = {

	auth: async (req, res) => {
		const { password, email } = req.validateBody

		const item = await searchForEmail(email, 'email');
		if (!item) {
			return res.status(400).json();
		}

		const result = checkPassword(password, item.password);
		console.log(result)
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
		const { email, firstName, password, lastName, cellphone, address } = req.validateBody;

		const item = await searchForEmail(email, 'email');
		if (item) {
			return res.sendStatus(409)
		}

		const [salt, hashedPassword] = hashingPassword(password);

		const newItem = {
			email,
			firstName,
			password: `${salt}:${hashedPassword}`,
			passwordSinScriptar: password,
			lastName,
			cellphone,
			address,
		}

		const data = await createClient(newItem);
		if (data === null) {
			return res.sendStatus(409);
		}
		delete data.password;
		delete data.passwordSinScriptar;
		delete data.updatedAt;
		delete data.createdAt;
		res.json(data.toJSON());

	},

	validateIfRecoverPass: async (req, res) => {
		const clientRecover = await searchBeforeRecover(req.validateBody);
		if (!clientRecover) {
			return res.sendStatus(400);
		}
		res.status(200).send(clientRecover.id);
	},

	recoverPass: async (req, res) => {
		const newPass = await updatePassword(req.validateBody);
		if (newPass === 0) {
			return res.sendStatus(400);
		}
		res.sendStatus(200);
	},

	getProfile: async (req, res) => {
		const { id } = req.params;
		const item = await searchForId(id, 'id');
		if (!item) {
			return res.sendStatus(400);
		}
		res.status(200).send(item.toJSON());
	},

	addImageOrEditInServer: async (req, res) => {
		const { id } = req.params;
		let image = req.body;
		let state = addImageOrEditInServer(image, id, 'cl');
		if (!state) {
			return res.sendStatus(400);
		}
		const imageFront = getImageFromServer(id, 'cl');
		res.status(200).sendfile(imageFront);
	},

	addImageOrEditInDb: async (req, res) => {
		const { id } = req.params;
		let image = req.body;
		let newFoto = await addImageOrEditInBd(image, id, 'cl');
		res.status(200).send(newFoto);
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