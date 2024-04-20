import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const JobSchema = sequelize.define('job', {
	jb_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: true,//cambiar despues
	},
	jb_fecha_inicio: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.DATEONLY,
		allowNull: true,
	},
	jb_fecha_termino: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.DATEONLY,
		allowNull: true,
	},
	jb_wr_id: {
		type: DataTypes.UUID,
		allowNull: true,
		references: {
			model: 'tb_worker',
			key: 'wr_id',
		}
	},
	jb_nec_id: {
		type: DataTypes.UUID,
		allowNull: true,
		references: {
			model: 'tb_necessity',
			key: 'nec_id',
		}
	},
	jb_puntaje: {
		type: DataTypes.INTEGER,//verificar o string mejor?
		allowNull: true,
	}
}, {
	timestamps: false,
	createdAt: 'jb_createdAt',
	updatedAt: 'jb_updatedAt',
	tableName: 'tb_job',
})