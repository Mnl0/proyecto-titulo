import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const CategorySchema = sequelize.define('category', {
	cat_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: true,//cambiar despues a false donde corresponda
	},
	cat_nombre: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	cat_descripcion: {
		type: DataTypes.TEXT,
		allowNull: true,
	}

}, {
	timestamps: true,
	createdAt: 'cat_createdAt',
	updatedAt: 'cat_updatedAt',
	tableName: 'tb_category',
})
