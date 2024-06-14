import { searchEmail, create, validatePassword, hashingPassword, searchBeforeRecover, updatePassword, searchForId, addImageOrEditInBd, addImageOrEditInServer, getImageFromServer } from "../models/workerModel.js";

export const workerController = {
	auth: async (req, res) => {
		const { email, password } = req.validateBody;

		const item = await searchEmail(email, 'email');
		if (!item) {
			return res.sendStatus(400)
		}

		const result = validatePassword(password, item.wr_password);
		if (!result) {
			return res.sendStatus(400)
		};

		const itemProfile = {
			firstName: item.wr_firstName,
			lastName: item.wr_lastName,
			email: item.wr_email,
			cellPhone: item.wr_cellPhone,
			address: item.wr_address,
			id: item.wr_id,
			imageProfile: item.wr_imagePath,
		};
		res.status(200).json(itemProfile);
	},

	create: async (req, res) => {
		const { firstName, lastName, email, password, cellPhone, address } = req.validateBody;

		const item = await searchEmail(email, 'email');
		if (item) {
			return res.sendStatus(409);
		}

		const [salt, hashedPassword] = hashingPassword(password)

		const newItem = {
			wr_email: email,
			wr_firstName: firstName,
			wr_password: `${salt}:${hashedPassword}`,
			wr_passwordSinScriptar: password,
			wr_lastName: lastName,
			wr_cellPhone: cellPhone,
			wr_address: address,
		}

		const data = await create(newItem);
		if (data === null) {
			return res.sendStatus(409);
		}

		const objCreate = {
			firstName: data.wr_firstName,
			lastName: data.wr_lastName,
			email: data.wr_email,
			cellPhone: data.wr_cellPhone,
			address: data.wr_address,
			id: data.wr_id
		}

		res.json(objCreate);
	},

	validateIfRecoverPass: async (req, res) => {
		const workerRecover = searchBeforeRecover(req.validateBody);
		if (!workerRecover) {
			return res.sendStatus(400);
		}
		res.status(200).send(workerRecover.id);
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
		//devolver imagen si es que tiene una con su id
		res.status(200).send(item.toJSON());
	},

	addImageOrEditInServer: async (req, res) => {
		const { id } = req.params;
		let image = req.body;
		let state = addImageOrEditInServer(image, id, 'wr');
		if (!state) {
			return res.sendStatus(400);
		}
		res.status(200);
	},

	addImageOrEditInDb: async (req, res) => {
		const { id } = req.params;
		let image = req.body;
		let newFoto = await addImageOrEditInBd(image, id, 'wr');
		if (newFoto === 0) {
			return res.sendStatus(400);
		}
		res.status(200).send(newFoto);
	},

	getAllForOccupation: (req, res) => {
		console.log('llege al controlador obtener todos los trbajadores por categoria')
		const { id } = req.params




		res.send(id)
	},


}