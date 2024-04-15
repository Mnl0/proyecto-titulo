import { DataTypes, } from "sequelize";
import { sequelize } from '../database/connection.js'

export const Client = sequelize.define('client', {
	cl_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	cl_nombre: {
		type: DataTypes.STRING(50),
		allowNull: true,//acepta nulos para test
	},
	cl_apellido: {
		type: DataTypes.STRING(50),
		allowNull: true,
	},
	cl_email: {
		type: DataTypes.STRING(100),
		allowNull: true,
	},
	cl_contrasena: {
		type: DataTypes.INTEGER(50),
		allowNull: true,
	},
	cl_telefono: {
		type: DataTypes.INTEGER(12),
		allowNull: true,
	},
	cl_latitud: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	cl_longitud: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
},
	{
		timestamps: true,
		freezeTableName: true, //chekear como funciona esto
		tableName: 'tb_client',
		defaultScope: {
			// attributes: { exclude: ['id'] } //no esta omitiendo el id predeterminado
		}
	}
)

//probar si puedo crear las tablas de aca
// Client.sync()