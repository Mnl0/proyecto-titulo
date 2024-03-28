import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'

export const Cliente = sequelize.define('cliente_pruebas', {
	nombre_completo: {
		type: DataTypes.STRING,
		// allowNull: true,
	},
},
	{
		timestamps: false,
		freezeTableName: true,
		tableName: 'cliente_pruebas',
		defaultScope: {
			attributes: { exclude: ['id'] }//no esta omitiendo el id predeterminado
		}
	}
)
