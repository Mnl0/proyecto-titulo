import { CategorySchema, getAll } from "../models/categoryModel.js";

export const categoryController = {
	get: async (req, res) => {
		const data = await getAll();
		// console.log(data)
		console.log(JSON.stringify(data, null, 4))
		res.send(JSON.stringify(data, null, 4));

	}
}