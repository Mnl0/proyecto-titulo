import { DataTypes } from "sequelize";
import { sequilize } from '../database/connection.js';

export const Cliente = sequilize.define('cliente_prueba', {
	id: {
		type: DataTypes.INTEGER,
		// allowNull: true,
	},
	nombre: {
		type: DataTypes.STRING,
		// allowNull: true,
	},
})

