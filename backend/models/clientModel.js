import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'

export const Client = sequelize.define('client', {
	nameclient: {
		type: DataTypes.STRING,
	},
	lastnameclient: {
		type: DataTypes.STRING,
	},
	phoneclient: {
		type: DataTypes.STRING,
	},
	emailclient: {
		type: DataTypes.STRING,
	},
},
	{
		timestamps: false,
		freezeTableName: true,
		tableName: 'client',
		defaultScope: {
			attributes: { exclude: ['id'] }//no esta omitiendo el id predeterminado
		}
	}
)

//probar si puedo crear las tablas de aca
//Client.sync()