import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'

export const ClientSchema = sequelize.define('client', {
	cl_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: true,
	},
	cl_nombre: {
		type: DataTypes.STRING(50),
		allowNull: true,// acepta nulos (test)
	},
	cl_apellido: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	cl_email: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	cl_contrasena: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	cl_telefono: {
		type: DataTypes.INTEGER(12),
		allowNull: true,
	},
	cl_latitud: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	cl_longitud: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
},
	//configuracion de una tabla
	{
		timestamps: true,
		createdAt: 'cl_createdAt',
		updatedAt: 'cl_updatedAt',
		tableName: 'tb_client',
		defaultScope: {
			// attributes: { exclude: ['id'] } //no esta omitiendo el id predeterminado
		}
	}
)

export function buscarPorEmail(obj) {
	return ClientSchema.findOne({ where: { cl_email: obj } })
}

export function buscEmail(obj) {
	return new Promise((resolve, reject) => {
		const eleBuscado = ClientSchema.findOne({ where: { cl_email: obj } })
		if (eleBuscado === null) {
			reject(null)
		} else {
			resolve(eleBuscado)
		}
	})
} 