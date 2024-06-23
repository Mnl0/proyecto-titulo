import { searchEmail, create, validatePassword, hashingPassword, searchBeforeRecover, updatePassword, searchForId, addImageOrEditInBd, addImageOrEditInServer, getAllForOccupation } from "../models/workerModel.js";

import { connectedWorkers } from '../server.js';

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
		const { firstName, lastName, email, password, cellPhone, address, category } = req.validateBody;

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
			wr_category: category
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

	//==============nose esta usando===========\\
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
		if (!state.success) {
			return res.sendStatus(400);
		}
		res.sendStatus(200);
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

	getAllForOccupation: async (req, res) => {
		const { id } = req.params
		const { category } = req.body;
		const data = await getAllForOccupation(category, 'wr');
		if (data === null) {
			res.sendStatus(400);
		}

		// Mapeamos los trabajadores para agregarles el estado de conexión
		const nuevaData = data.map(worker => ({
			...worker.dataValues,
			online: connectedWorkers.some(connectedWorker => connectedWorker.id === worker.dataValues.id)
		  }));
		  
		res.send(nuevaData);
	},
}