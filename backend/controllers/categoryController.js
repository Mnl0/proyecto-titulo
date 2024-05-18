import { CategorySchema, getAll } from "../models/categoryModel.js";
/// Get all categories
/// @route GET /api/categories
/// @access Public
export const categoryController = {
	get: async (req, res) => {
		const data = await getAll();
		res.send(JSON.stringify(data, null, 4));

	}
}