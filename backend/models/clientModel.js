import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'
import { funcionGenericaBuscar } from "./funcionesGenericas.js";
import { scryptSync, timingSafeEqual } from 'node:crypto'
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
	cl_passwordSinScriptar: {	// ???????????????????????????????????????????????????? es innecesario
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	cl_direccion: {
		type: DataTypes.STRING(20),
		allowNull: true,
	}
},
	/*========configuracion tabla================*/
	{
		timestamps: true,
		createdAt: 'cl_createdAt',
		updatedAt: 'cl_updatedAt',
		tableName: 'tb_client',
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
/*
export function searchEmail(email) {
	return funcionGenericaBuscar(email, ClientSchema, 'cl')
}
*/
export async function searchEmail(email) {
	const searchedItem = await funcionGenericaBuscar(email, ClientSchema, 'cl');
	if (!searchedItem) return false;
	return searchedItem.dataValues;
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

export function validatePassword(password, hash) {
	const [salt, key] = hash.split(':');
	const hashedBuffer = scryptSync(password, salt, 64);
	const keyBuffer = Buffer.from(key, 'hex');
	return timingSafeEqual(hashedBuffer, keyBuffer);

}
