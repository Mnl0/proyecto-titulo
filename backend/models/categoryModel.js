import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const CategorySchema = sequelize.define('category', {
	cat_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: true,//cambiar despues a false donde corresponda
	},
	cat_name: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	cat_description: {
		type: DataTypes.TEXT,
		allowNull: true,
	}

}, {
	timestamps: true,
	createdAt: 'cat_createdAt',
	updatedAt: 'cat_updatedAt',
	tableName: 'tb_category',
})
/*=========funcion crear cuando habilitemos panel de administracion==========*/
async function crear() {
	const newCategory = {
		cat_name: "Carpinteria",
		cat_description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
	}
	const data = await get(newCategory.cat_name);
	if (data) {
		return
	}
	await CategorySchema.create(newCategory);
}
crear()
//cat_name: "Gasfiteria",
//cat_name: "Albanileria",
//cat_name: "Electricista",
//cat_name: "Carpinteria",

export async function getAll() {
	return await CategorySchema.findAll();
}

async function get(elem) {
	return await CategorySchema.findOne(elem.cat_name);
}
