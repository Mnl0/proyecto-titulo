import { DataTypes } from "sequelize";
import { sequelize } from '../database/connection.js'

export const Client = sequelize.define('client', {
	cl_id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: true,
	},
	cl_nombre: {
		type: DataTypes.STRING(50),
		allowNull: true,// acepta nulos (test)
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
	//configuracion de una tabla
	{
		timestamps: true,
		createdAt: 'cl_createdAt',
		updatedAt: 'cl_updatedAt',
		tableName: 'tb_client',
		defaultScope: {
			// attributes: { exclude: ['id'] } //no esta omitiendo el id predeterminado
		}
	}
)

// Client.create({ cl_nombre: 'manuel' }).then((e) => {
// console.log(e instanceof Client)
// console.log(e.cl_nombre)
// 	console.log(e.toJSON())//usar este para imprimir tiene colores xD
// console.log(JSON.stringify(e, null, 4))//usar este para imprimir el objeto ta good
// e.update({ cl_nombre: 'eduardo' }) //actualizar good
// e.save() //para confirmar los cambios en bd
// e.destroy() //elimina elemento devuelto por la promesa(e)
// e.reload() //realiza un tipo select
// console.log(e.toJSON())
// e.save({fiels: ['cl_nombre']})//actualiza el cambion en la bd
// })