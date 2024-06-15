import { hashingPassword, checkPassword, searchBeforeRecover, updatePassword, searchForEmail, searchForId, addImageOrEditInBd, addImageOrEditInServer, getImageFromServer, createClient } from '../models/clientModel.js'

export const clientController = {

	auth: async (req, res) => {
		const { password, email } = req.validateBody

		const item = await searchForEmail(email, 'email');
		if (!item) {
			return res.status(400).json();
		}

		const result = checkPassword(password, item.cl_password);
		if (!result) {
			return res.status(400).json();
		}

		const itemProfile = {
			firstName: item.cl_firstName,
			lastName: item.cl_lastName,
			email: item.cl_email,
			cellPhone: item.cl_cellPhone,
			address: item.cl_address,
			id: item.cl_id,
			imageProfile: item.cl_imagePath,
		}
		res.status(200).json(itemProfile)
	},

	create: async (req, res) => {
		const { email, firstName, password, lastName, cellPhone, address } = req.validateBody;

		const item = await searchForEmail(email, 'email');
		if (item) {
			return res.sendStatus(409)
		}

		const [salt, hashedPassword] = hashingPassword(password);

		const newItem = {
			cl_email: email,
			cl_firstName: firstName,
			cl_password: `${salt}:${hashedPassword}`,
			cl_passwordSinScriptar: password,
			cl_lastName: lastName,
			cl_cellPhone: cellPhone,
			cl_address: address,
		}

		const data = await createClient(newItem);
		if (data === null) {
			return res.sendStatus(409);
		}

		const objCreate = {
			firstName: data.cl_firstName,
			lastName: data.cl_lastName,
			email: data.cl_email,
			cellPhone: data.cl_cellPhone,
			address: data.cl_address,
			id: data.cl_id,
		}
		res.status(200).json(objCreate);

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

	//===========ruta no se esta usando=================//
	getProfileOnlyDb: async (req, res) => {
		const { id } = req.params;
		const item = await searchForId(id, 'id');
		if (!item) {
			return res.sendStatus(400);
		}
		res.status(200).send(item.toJSON());
	},

	/*=======considerar obtener los datos y la imagen del servidor*/
	getProfileImgServer: async (req, res) => {
		const imageFront = getImageFromServer(id, 'cl');

	},

	addImageOrEditInServer: async (req, res) => {
		const { id } = req.params;
		let image = req.body;
		let state = await addImageOrEditInServer(image, id, 'cl');
		if (!state.success) {
			return res.sendStatus(400);
		}
		res.sendStatus(200);
	},

	//===========ruta no se esta usando=================//
	addImageOrEditInDb: async (req, res) => {
		const { id } = req.params;
		let image = req.body;
		let newFoto = await addImageOrEditInBd(image, id, 'cl');
		if (newFoto === 0) {
			return res.sendStatus(400);
		}
		res.sendStatus(200);
	},

	getService: (req, res) => {
		console.log('llege al controlador')
		//aca deberia recibir el id del trabajador
		//crear un id para  el servicio y pasar el id del cliente
		//asi dejar un historial de los servicios tanto para el cliente como el trabajador
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