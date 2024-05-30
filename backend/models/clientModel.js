import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'
import { funcionGenericaBuscar } from "./funcionesGenericas.js";
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export const ClientSchema = sequelize.define('client', {
	cl_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	cl_firtName: {
		type: DataTypes.STRING(50),
		allowNull: false,// acepta nulos (test)
	},
	cl_lastName: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	cl_email: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	},
	cl_password: {
		type: DataTypes.STRING(200),
		allowNull: false,
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
	//********para poder ingresar mientras a las cuentas de clientes de prueba*********//
	cl_passwordSinScriptar: {
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

/*===una vez que el fron envie el tipo modificar
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

export function hashingPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const hashedPassword = scryptSync(password, salt, 64).toString('hex');
	return [hashedPassword, salt]
}