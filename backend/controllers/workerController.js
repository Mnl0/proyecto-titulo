import { searchEmail, create, validatePassword, hashingPassword, searchBeforeRecover, updatePassword } from "../models/workerModel.js";

export const workerController = {
	auth: async (req, res) => {
		const { wr_email, wr_password } = req.body;

		const item = await searchEmail(wr_email)
		if (!item) {
			return res.sendStatus(400)
		}

		const result = validatePassword(wr_password, item.wr_password);

		if (!result) {
			return res.sendStatus(400)
		};

		const itemProfile = {
			...item.toJSON()
		};
		res.json(itemProfile)

	},
	create: async (req, res) => {
		const { wr_firtName, wr_lastName, wr_email, wr_password, wr_cellphone, wr_direccion } = req.body;

		const item = await searchEmail(wr_email);
		if (!item) {
			return res.sendStatus(409);
		}

		const [salt, hashedPassword] = hashingPassword(wr_password)

		const newItem = {
			wr_email,
			wr_firtName,
			wr_password: `${salt}:${hashedPassword}`,
			wr_passwordSinScriptar: wr_password,
			wr_lastName,
			wr_cellphone,
			wr_direccion,
		}

		const data = await create(newItem);
		if (data === null) {
			return res.sendStatus(409);
		}
		delete data.wr_password;
		delete data.wr_passwordSinScriptar;
		delete data.wr_updatedAt;
		delete data.wr_createdAt;
		res.json(data.toJSON());
	},

	validateIfRecoverPass: async (req, res) => {
		const workerRecover = searchBeforeRecover(req.body);
		if (!workerRecover) {
			return res.sendStatus(400);
		}
		res.status(200).send(workerRecover.wr_id);
	},

	recoverPass: async (req, res) => {
		const newPass = await updatePassword(req.body);
		if (newPass === 0) {
			return res.sendStatus(400);
		}
		res.sendStatus(200);
	}
}