import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'
import { addImageOrEditInServerForModel, createForModel, getImageFromServerForModel, passwordHashedGeneral, searchAllForModel, searchBeforeRecoverForModel, searchForModel, updateImageForModel, updatePasswordForModel, validatePasswordGeneral } from "../util/function.js";
import random from 'node:crypto'

export const WorkerSchema = sequelize.define('worker', {
	wr_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	wr_firstName: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	wr_lastName: {
		type: DataTypes.STRING(50),
		allowNull: false,
	},
	wr_email: {
		type: DataTypes.STRING(100),
		allowNull: false,
		unique: true,
	},
	wr_password: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
	wr_cellPhone: {
		type: DataTypes.INTEGER(12),
		allowNull: true,
	},
	wr_latitude: {
		type: DataTypes.DOUBLE,
		allowNull: true,
	},
	wr_longitude: {
		type: DataTypes.DOUBLE,
		allowNull: true,
	},
	//********para poder ingresar mientras a las cuentas de clientes de prueba*********//
	wr_passwordSinScriptar: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	wr_address: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	wr_imageProfile: {
		type: DataTypes.BLOB('long'),
		allowNull: true,
	},
	wr_imagePath: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	wr_category: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
},
	{
		/*=====se debe agregar el timestamps true cuando se puede eliminar de manera correcta cualquier elemento de esta tabla error con fk*/
		timestamps: false,
		createdAt: 'wr_createdAt',
		updatedAt: 'wr_updatedAt',
		tableName: 'tb_worker',
	}
)

export function searchEmail(email, nameColumn) {
	return searchForModel(email, WorkerSchema, 'wr', nameColumn)
}

export async function create(worker) {
	return await createForModel(WorkerSchema, worker);
}

export function validatePassword(password, hash) {
	return validatePasswordGeneral(password, hash);
}

export function hashingPassword(password) {
	return passwordHashedGeneral(password);
}

export async function searchBeforeRecover(worker) {
	return await searchBeforeRecoverForModel(worker, WorkerSchema, 'wr');
}

export async function updatePassword(worker) {
	return await updatePasswordForModel(worker, WorkerSchema, 'wr');
}

export async function searchForId(id, nameColumn) {
	return await searchForModel(id, WorkerSchema, 'wr', nameColumn);
}

export function addImageOrEditInServer(image, id, pref) {
	return addImageOrEditInServerForModel(image, id, pref, WorkerSchema);
}

export function getImageFromServer(id, pref) {
	return getImageFromServerForModel(id, pref);
}

export async function addImageOrEditInBd(image, id, pref) {
	return await updateImageForModel(image, id, pref, WorkerSchema);
}

export async function getAllForOccupation(value, pref) {
	return await searchAllForModel(value, WorkerSchema, pref, 'category');
}

async function cargarData() {
	const [salt1, hashedPassword1] = hashingPassword("6666")
	const [salt2, hashedPassword2] = hashingPassword("7777")
	const [salt3, hashedPassword3] = hashingPassword("8888")
	const [salt4, hashedPassword4] = hashingPassword("9999")
	const [salt5, hashedPassword5] = hashingPassword("0000")
	const [salt6, hashedPassword6] = hashingPassword("4141")
	const [salt7, hashedPassword7] = hashingPassword("7272")
	const [salt8, hashedPassword8] = hashingPassword("9292")
	const [salt9, hashedPassword9] = hashingPassword("7878")

	const newWorker = [
		{
			wr_firstName: "angela",
			wr_lastName: "wu",
			wr_email: "mail1@email.cl",
			wr_id: random.randomUUID(),
			wr_passwordSinScriptar: "6666",
			wr_cellPhone: "988776655",
			wr_latitude: "-36.815032",
			wr_longitude: "-73.029097",
			wr_address: "sweth",
			wr_category: "Albanileria",
			wr_password: `${salt1}:${hashedPassword1}`,
		},
		{
			wr_firstName: "marite",
			wr_lastName: "rosen",
			wr_email: "mail2@email.cl",
			wr_passwordSinScriptar: "7777",
			wr_cellPhone: "988776655",
			wr_latitude: "-36.777229",
			wr_longitude: "-73.023316",
			wr_address: "wite rose",
			wr_category: "Albanileria",
			wr_id: random.randomUUID(),
			wr_password: `${salt2}:${hashedPassword2}`,
		},
		{
			wr_firstName: "jumbo",
			wr_lastName: "cloud",
			wr_email: "mail3@email.cl",
			wr_passwordSinScriptar: "8888",
			wr_cellPhone: "988776655",
			wr_latitude: "-36.766764",
			wr_longitude: "-73.013313",
			wr_address: "big lasagna",
			wr_category: "Carpinteria",
			wr_id: random.randomUUID(),
			wr_password: `${salt3}:${hashedPassword3}`,
		},
		{
			wr_firstName: "rosal",
			wr_lastName: "tuca",
			wr_email: "mail4@email.cl",
			wr_passwordSinScriptar: "9999",
			wr_cellPhone: "988776655",
			wr_latitude: "-36.743293",
			wr_longitude: "-73.104360",
			wr_address: "camaron",
			wr_category: "Carpinteria",
			wr_id: random.randomUUID(),
			wr_password: `${salt4}:${hashedPassword4}`,
		},
		{
			wr_firstName: "tucapel",
			wr_lastName: "amapola",
			wr_email: "mail5@email.cl",
			wr_passwordSinScriptar: "0000",
			wr_cellPhone: "988776655",
			wr_latitude: "-36.792198",
			wr_longitude: "-73.053403",
			wr_address: "hibridos",
			wr_category: "Gasfiteria",
			wr_id: random.randomUUID(),
			wr_password: `${salt5}:${hashedPassword5}`,
		},
		{
			wr_firstName: "sabina",
			wr_lastName: "hurtado",
			wr_email: "mail16@email.cl",
			wr_passwordSinScriptar: "4141",
			wr_cellPhone: "988776655",
			wr_latitude: "-36.793916",
			wr_longitude: "-73.045464",
			wr_address: "casino marina",
			wr_category: "Gasfiteria",
			wr_id: random.randomUUID(),
			wr_password: `${salt6}:${hashedPassword6}`,
		},
		{
			wr_firstName: "isabel",
			wr_lastName: "nova",
			wr_email: "mail7@email.cl",
			wr_passwordSinScriptar: "7272",
			wr_cellPhone: "988776655",
			wr_latitude: "-36.788314",
			wr_longitude: "-73.034306",
			wr_address: "mago nicolas",
			wr_id: random.randomUUID(),
			wr_category: "Electricista",
			wr_password: `${salt7}:${hashedPassword7}`,
		},
		{
			wr_firstName: "pino",
			wr_lastName: "valenzuela",
			wr_email: "mail8@email.cl",
			wr_passwordSinScriptar: "9292",
			wr_cellPhone: "988776655",
			wr_latitude: "-36.771403",
			wr_longitude: "-73.070741",
			wr_address: "magia",
			wr_category: "Electricista",
			wr_id: random.randomUUID(),
			wr_password: `${salt8}:${hashedPassword8}`,
		},
		{
			wr_password: `${salt9}:${hashedPassword9}`,
			wr_firstName: "guairao",
			wr_id: random.randomUUID(),
			wr_lastName: "mercedez",
			wr_email: "mail9@email.cl",
			wr_passwordSinScriptar: "7878",
			wr_cellPhone: "988776655",
			wr_latitude: "-36.777041",
			wr_longitude: "-73.053875",
			wr_address: "ruleta",
			wr_category: "Electricista"
		}
	]
	await WorkerSchema.bulkCreate(newWorker);
}
//cargarData()