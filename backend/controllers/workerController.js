import { searchEmail, create, validatePassword, hashingPassword, searchBeforeRecover, updatePassword, searchForId, addImageOrEditInBd, addImageOrEditInServer, getImageFromServer } from "../models/workerModel.js";

export const workerController = {
	auth: async (req, res) => {
		const { email, password } = req.validateBody;

		const item = await searchEmail(email, 'email');
		if (!item) {
			return res.sendStatus(400)
		}

		const result = validatePassword(password, item.password);
		if (!result) {
			return res.sendStatus(400)
		};

		const itemProfile = {
			...item.toJSON()
		};
		res.status(200).json(itemProfile);
	},

	create: async (req, res) => {
		const { firtName, lastName, email, password, cellphone, address } = req.validateBody;

		const item = await searchEmail(email, 'email');
		if (!item) {
			return res.sendStatus(409);
		}

		const [salt, hashedPassword] = hashingPassword(password)

		const newItem = {
			email,
			firtName,
			password: `${salt}:${hashedPassword}`,
			passwordSinScriptar: password,
			lastName,
			cellphone,
			address,
		}

		const data = await create(newItem);
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
		res.status(200).send(item.toJSON());
	},

	addImageOrEditInServer: async (req, res) => {
		const { id } = req.params;
		let image = req.body;
		let state = addImageOrEditInServer(image, id, 'wr');
		if (!state) {
			return res.sendStatus(400);
		}
		const imageFront = getImageFromServer(id, 'wr');
		res.status(200).sendfile(imageFront);
	},

	addImageOrEditInDb: async (req, res) => {
		const { id } = req.params;
		let image = req.body;
		let newFoto = await addImageOrEditInBd(image, id, 'wr');
		res.status(200).send(newFoto);
	},

	getAllForOccupation: (req, res) => {
		console.log('llege al controlador obtener todos los trbajadores por categoria')
	},


}