import { addJobHistory } from "../models/jobHistoryModel.js";

export const jobHistoryController = {
	create: async (req, res) => {
		const { idCliente, idWorker, image, description } = req.body;
		const newJob = {
			jh_id_cl: idCliente,
			jh_id_wr: idWorker,
			jh_description: description,
			jh_image: image
		}
		const data = await addJobHistory(newJob);
		if (data === null) {
			res.sendStatus(400);
		}
		res.json(data);
	}
}