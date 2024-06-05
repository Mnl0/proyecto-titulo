import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'
import { createForModel, passwordHashedGeneral, searchBeforeRecoverForModel, validatePasswordGeneral, updatePasswordForModel, searchForModel, updateImageForModel } from '../util/function.js';
import path from 'node:path';
import fs from 'node:fs';
import { __dirname } from '../server.js';

export const ClientSchema = sequelize.define('client', {
	cl_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	cl_firtName: {
		type: DataTypes.STRING(50),
		allowNull: false,
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
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	cl_imageProfile: {
		type: DataTypes.BLOB('long'),
		allowNull: true,
	},
},

	/*========configuracion tabla================*/
	{
		timestamps: true,
		createdAt: 'cl_createdAt',
		updatedAt: 'cl_updatedAt',
		tableName: 'tb_client',
	}
)

export async function searchForEmail(email, nameColumn) {
	return await searchForModel(email, ClientSchema, 'cl', nameColumn);
}

export async function createClient(client) {
	return await createForModel(ClientSchema, client);
}

export function checkPassword(password, hash) {
	return validatePasswordGeneral(password, hash);
}

export function hashingPassword(password) {
	return passwordHashedGeneral(password);
}

export async function searchBeforeRecover(client) {
	return await searchBeforeRecoverForModel(client, ClientSchema, 'cl');
}

export async function updatePassword(client) {
	return await updatePasswordForModel(client, ClientSchema, 'cl');
}

export async function searchForId(id, nameColumn) {
	return await searchForModel(id, ClientSchema, 'cl', nameColumn);
}

export async function updateProfile(id) {
	return await searchForId(id, 'id');
}

export function addImageOrEdit(image, id, pref) {
	try {
		const imageBuffer = Buffer.from(image, 'base64');
		const folderStorageImage = path.join(__dirname, 'storage');
		if (!fs.existsSync(folderStorageImage)) {
			fs.mkdirSync(folderStorageImage);
		}
		fs.writeFileSync(`${folderStorageImage}/${id}_${pref}.jpg`, imageBuffer);
		return true;
	} catch (err) {
		return { success: false, error: err };
	}
	//falta tomar la url de la imagen y guardarla en la bd?
}

export async function addImageOrEditInBd(image, id, pref) {
	return await updateImageForModel(image, id, pref, ClientSchema);
}