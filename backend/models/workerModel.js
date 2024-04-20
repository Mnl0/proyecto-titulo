import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'

//deberia agregar el prefijo schema aca???
export const Worker = sequelize.define('worker', {
	wr_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
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
		createdAt: 'tb_createdAt',
		updatedAt: 'tb_updatedAt',
		tableName: 'tb_worker',
	}
)
