import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'
import { funcionGenericaBuscar } from "./funcionesGenericas.js";
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto'

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
	return funcionGenericaBuscar(email, WorkerSchema, 'wr')
}

export function create(worker) {
	return new Promise((resolve, reject) => {
		const newWorker = WorkerSchema.create(worker);
		if (newWorker) {
			resolve(newWorker);
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

export async function searchBeforeRecover(worker) {
	return await WorkerSchema.findOne({
		where: {
			wr_email: worker.wr_email,
			wr_firtName: worker.wr_firtName,
			wr_cellphone: worker.wr_cellphone
		}
	})
}

export async function updatePassword(worker) {
	const [hashedPassword, salt] = hashingPassword(worker.wr_password);
	const newPassword = `${salt}${hashedPassword}`;
	return await WorkerSchema.update(
		{ wr_password: newPassword, wr_passwordSinScriptar: worker.wr_password }, {
		where: {
			wr_id: worker.wr_id
		}
	})
}