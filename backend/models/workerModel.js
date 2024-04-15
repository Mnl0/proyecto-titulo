import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection";

export const Worker = sequelize.define('worker', {
	wr_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	wr_nombre: {
		type: DataTypes.STRING(50),
		allowNull: true,//acepta nulos para test
	},
	wr_apellido: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	wr_email: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	wr_contrasena: {
		type: DataTypes.INTEGER(50),
		allowNull: false,
	},
	wr_telefono: {
		type: DataTypes.INTEGER(12),
		allowNull: false,
	},
	wr_latitud: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	wr_longitud: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
},
	{
		timestamps: true,
		freezeTableName: true, //chekear como funciona esto
		tableName: 'tb_worker',
		defaultScope: {
			// attributes: { exclude: ['id'] } //no esta omitiendo el id predeterminado
		}
	}
)
Worker.sync()
