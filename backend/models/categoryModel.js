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
	const newCategory = [

		{
			cat_name: "Gasfiteria",
			cat_description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
		},
		{
			cat_name: "Albanileria",
			cat_description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
		},
		{
			cat_name: "Electricista",
			cat_description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
		},
		{
			cat_name: "Carpinteria",
			cat_description: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
		}
	]
	await CategorySchema.bulkCreate(newCategory);

}
//crear()

export async function getAll() {
	return await CategorySchema.findAll({
		attributes: [['cat_id', 'id'], ['cat_name', 'name'], ['cat_description', 'description']]
	});
}
