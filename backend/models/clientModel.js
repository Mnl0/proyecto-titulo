import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'
import { funcionGenericaBuscar } from "./funcionesGenericas.js";

export const ClientSchema = sequelize.define('client', {
	cl_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: true,
	},
	cl_firtName: {
		type: DataTypes.STRING(50),
		allowNull: true,// acepta nulos (test)
	},
	cl_lastName: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	cl_email: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	cl_password: {
		type: DataTypes.STRING(200),
		allowNull: true,
	},
	cl_cellphone: {
		type: DataTypes.INTEGER(12),
		allowNull: true,
	},
	cl_latitude: {
		type: DataTypes.DOUBLE,
		allowNull: true,
	},
	cl_longitude: {
		type: DataTypes.DOUBLE,
		allowNull: true,
	},
	cl_passwordSinScriptar: {
		type: DataTypes.STRING(50),
		allowNull: true,
	}
	/*=====agregar direccion????=======*/
},
	/*========configuracion tabla================*/
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

// export function searchEmail(email) {
// 	return new Promise((resolve, reject) => {
// 		const searchItem = ClientSchema.findOne({ where: { cl_email: email } })
// 		if (searchItem === null) {
// 			reject(null)
// 		} else {
// 			resolve(searchItem)
// 		}
// 	})
// }

export function searchEmail(email) {
	return funcionGenericaBuscar(email, ClientSchema, 'cl')
}

export function create(client) {
	return new Promise((resolve, reject) => {
		const newClient = ClientSchema.create(client);
		if (newClient) {
			resolve(newClient);
		} else {
			reject(null);
		}
	})
}
