import { DataTypes, UUID } from "sequelize";
import { sequelize } from "../database/connection.js";

export const NecessitySchema = sequelize.define('necessity', {
	nec_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: true,//modificar despues
	},
	nec_titulo: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	nec_descripcion: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	nec_fecha_publicacion: {
		type: DataTypes.DATE,//verificar que dato guarda sino modificarlo
		defaultValue: DataTypes.DATEONLY,
		allowNull: true,
	},
	nec_fecha_termino: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.DATEONLY,
		allowNull: true,
	},
	nec_cl_id: {
		type: DataTypes.UUID,
		allowNull: true,
		// references: {
		// 	model: 'tb_client',
		// 	key: 'cl_id'
		// }
	},
	nec_cat_id: {
		type: UUID,
		allowNull: true,
		// references: {
		// 	model: 'tb_category',
		// 	key: 'cat_id',
		// }
	}

}, {
	timestamps: false,
	createdAt: 'nec_createdAt',
	updatedAt: 'nec_updatedAt',
	tableName: 'tb_necessity',
})