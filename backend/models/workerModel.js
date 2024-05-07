import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'
import { funcionGenericaBuscar } from "./funcionesGenericas.js";

export const WorkerSchema = sequelize.define('worker', {
	wr_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	},
	wr_firtName: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	wr_lastName: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	wr_email: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	wr_password: {
		type: DataTypes.STRING(200),
		allowNull: true,
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
	wr_passwordSinScriptar: {
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

//verificar cual opcion es mejor
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