import { getAll } from "../models/categoryModel.js";
/// Get all categories
/// @route GET /api/categories
/// @access Public
export const categoryController = {
	getAll: async (req, res) => {
		const data = await getAll();
		res.send(data);
	},
}