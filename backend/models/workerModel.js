import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'
import { createForModel, searchBeforeRecoverForModel, searchEmailForModel, updatePasswordForModel, validatePasswordGeneral } from "../util/function.js";


export const WorkerSchema = sequelize.define('worker', {
	wr_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	wr_firtName: {
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
	wr_cellphone: {
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
	wr_direccion: {
		type: DataTypes.STRING(50),
		allowNull: true,
	}
},
	{
		/*=====se debe agregar el timestamps true cuando se puede eliminar de manera correcta cualquier elemento de esta tabla error con fk*/
		timestamps: false,
		createdAt: 'wr_createdAt',
		updatedAt: 'wr_updatedAt',
		tableName: 'tb_worker',
	}
)

export function searchEmail(email) {
	return searchEmailForModel(email, WorkerSchema, 'wr')
}

export async function create(worker) {
	return await createForModel(WorkerSchema, worker);
}

export function validatePassword(password, hash) {
	return validatePasswordGeneral(password, hash);
}

export function hashingPassword(password) {
	return validatePasswordGeneral(password, hash);
}

export async function searchBeforeRecover(worker) {
	return await searchBeforeRecoverForModel(worker, WorkerSchema, 'wr');
}

export async function updatePassword(worker) {
	return await updatePasswordForModel(worker, WorkerSchema, 'wr');
}