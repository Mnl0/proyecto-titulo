import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import { createForModel } from "../util/function.js";

export const JobHistorySchema = sequelize.define('jobHistory', {
	jh_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: true,
	},
	jh_id_cl: {
		type: DataTypes.UUID,
		allowNull: true,
	},
	jh_id_wr: {
		type: DataTypes.UUID,
		allowNull: true,
	},
	//arreglo imagenes
	jh_image: {
		type: DataTypes.BLOB('long'),
		allowNull: true,
	},
	jh_description: {
		type: DataTypes.STRING(500),
		allowNull: true,
	},
	jh_start_date: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
		allowNull: true,
	},
	jh_end_date: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	jh_score_worker: {
		type: DataTypes.INTEGER(10),
		allowNull: true,
	},
	jh_score_client: {
		type: DataTypes.INTEGER(10),
		allowNull: true,
	},
	//arreglo estados
	jh_state: {
		type: DataTypes.STRING(250),
		allowNull: true,
	},
	jh_comment_client: {
		type: DataTypes.STRING(250),
		allowNull: true,
	},
	jh_amount: {
		type: DataTypes.INTEGER(10),
		allowNull: true,
	},
},
	{
		timestamps: false,
		createdAt: 'jh_createdAt',
		updatedAt: 'jh_updatedAt',
		tableName: 'tb_job_history',

	})

export async function addJobHistory(data) {
	return await createForModel(JobHistorySchema, data);
}