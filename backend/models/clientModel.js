import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'
import { createForModel, passwordHashedGeneral, searchBeforeRecoverForModel, validatePasswordGeneral, updatePasswordForModel, searchForModel, updateImageForModel, addImageOrEditInServerForModel, getImageFromServerForModel } from '../util/function.js';
import random from 'node:crypto'

export const ClientSchema = sequelize.define('client', {
	cl_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	cl_firstName: {
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
	cl_cellPhone: {
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
	cl_address: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	cl_imageProfile: {
		type: DataTypes.BLOB('long'),
		allowNull: true,
	},
	cl_imagePath: {
		type: DataTypes.STRING(100),
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

export async function addImageOrEditInServer(image, id, pref) {
	return await addImageOrEditInServerForModel(image, id, pref, ClientSchema);
}
/*=================esta demas esta funcion===============*/
export function getImageFromServer(id, pref) {
	return getImageFromServerForModel(id, pref);
}

export async function addImageOrEditInBd(image, id, pref) {
	return await updateImageForModel(image, id, pref, ClientSchema);
}

//===================poblar tablas con datos============================\\
async function cargarData() {
	const [salt1, hashedPassword1] = hashingPassword("1234")
	const [salt2, hashedPassword2] = hashingPassword("5678")
	const [salt3, hashedPassword3] = hashingPassword("0987")
	const [salt4, hashedPassword4] = hashingPassword("7654")
	const [salt5, hashedPassword5] = hashingPassword("1212")
	const [salt6, hashedPassword6] = hashingPassword("1111")
	const [salt7, hashedPassword7] = hashingPassword("2222")
	const [salt8, hashedPassword8] = hashingPassword("3333")
	const [salt9, hashedPassword9] = hashingPassword("5555")

	const newClient = [
		{
			cl_id: random.randomUUID(),
			cl_firstName: "juanito",
			cl_lastName: "peres",
			cl_email: "email@email.cl",
			cl_password: `${salt1}:${hashedPassword1}`,
			cl_passwordSinScriptar: "1234",
			cl_cellPhone: "988776655",
			cl_latitude: "-36.788990",
			cl_longitude: "-73.110784",
			cl_address: "nueva imperial 123"
		},
		{
			cl_id: random.randomUUID(),
			cl_firstName: "pedro",
			cl_lastName: "paz",
			cl_email: "email2@email.cl",
			cl_password: `${salt2}:${hashedPassword2}`,
			cl_passwordSinScriptar: "5678",
			cl_cellPhone: "988776655",
			cl_latitude: "-36.840239",
			cl_longitude: "-73.119806",
			cl_address: "belgica 123"
		},
		{
			cl_id: random.randomUUID(),
			cl_firstName: "cesar",
			cl_lastName: "toledo",
			cl_email: "email3@email.cl",
			cl_password: `${salt3}:${hashedPassword3}`,
			cl_passwordSinScriptar: "0987",
			cl_cellPhone: "988776655",
			cl_latitude: "-36.851777",
			cl_longitude: "-73.142820",
			cl_address: "grecia 123"
		},
		{
			cl_id: random.randomUUID(),
			cl_firstName: "victo",
			cl_lastName: "venega",
			cl_email: "email4@email.cl",
			cl_password: `${salt4}:${hashedPassword4}`,
			cl_passwordSinScriptar: "7654",
			cl_cellPhone: "988776655",
			cl_latitude: "-36.833482",
			cl_longitude: "-73.058638",
			cl_address: "londres 123"
		},
		{
			cl_id: random.randomUUID(),
			cl_firstName: "leandro",
			cl_lastName: "venabidez",
			cl_email: "email5@email.cl",
			cl_password: `${salt5}:${hashedPassword5}`,
			cl_passwordSinScriptar: "1212",
			cl_cellPhone: "988776655",
			cl_latitude: "-36.832994",
			cl_longitude: "-73.053635",
			cl_address: "peru"
		},
		{
			cl_id: random.randomUUID(),
			cl_firstName: "eduardo",
			cl_lastName: "sandoval",
			cl_email: "email6@email.cl",
			cl_password: `${salt6}:${hashedPassword6}`,
			cl_passwordSinScriptar: "1111",
			cl_cellPhone: "988776655",
			cl_latitude: "-36.830445",
			cl_longitude: "-73.053590",
			cl_address: "chile"
		},
		{
			cl_id: random.randomUUID(),
			cl_firstName: "luis",
			cl_lastName: "munoz",
			cl_email: "email7@email.cl",
			cl_password: `${salt7}:${hashedPassword7}`,
			cl_passwordSinScriptar: "2222",
			cl_cellPhone: "988776655",
			cl_latitude: "-36.829001",
			cl_longitude: "-73.056206",
			cl_address: "colombia"
		},
		{
			cl_id: random.randomUUID(),
			cl_firstName: "julian",
			cl_lastName: "arana",
			cl_email: "email8@email.cl",
			cl_password: `${salt8}:${hashedPassword8}`,
			cl_passwordSinScriptar: "3333",
			cl_cellPhone: "988776655",
			cl_latitude: "-36.826483",
			cl_longitude: "-73.050239",
			cl_address: "panama"
		},
		{
			cl_id: random.randomUUID(),
			cl_firstName: "gengar",
			cl_lastName: "paleta",
			cl_email: "email9@email.cl",
			cl_password: `${salt9}:${hashedPassword9}`,
			cl_passwordSinScriptar: "5555",
			cl_cellPhone: "988776655",
			cl_latitude: "-36.817874",
			cl_longitude: "-73.021821",
			cl_address: "casino"
		},
	]
	await ClientSchema.bulkCreate(newClient);
}
//cargarData()