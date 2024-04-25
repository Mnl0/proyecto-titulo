import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'

//deberia agregar el prefijo schema aca???
export const workerSchema = sequelize.define('worker', {
	wr_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	wr_nombre: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	wr_apellido: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	wr_email: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	wr_contrasena: {
		type: DataTypes.INTEGER(50),
		allowNull: true,
	},
	wr_latitud: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	wr_longitud: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
},
	{
		timestamps: true,
		createdAt: 'wr_createdAt',
		updatedAt: 'wr_updatedAt',
		tableName: 'tb_worker',
	}
)
