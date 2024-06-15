import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const SpecialtySchema = sequelize.define('specialty', {
	sp_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: true,
	},
	sp_nombre: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	sp_wr_id: {
		type: DataTypes.UUID,
		allowNull: true,
		// references: {
		// 	model: 'tb_worker',
		// 	key: 'wr_id',
		// }
	},
	sp_cat_id: {
		type: DataTypes.UUID,
		allowNull: true,
		// references: {
		// 	model: 'tb_category',
		// 	key: 'cat_id',
		// }
	},
}, {
	timestamps: true,
	createdAt: 'sp_createdAt',
	updatedAt: 'sp_updatedAt',
	tableName: 'tb_specialty',

})