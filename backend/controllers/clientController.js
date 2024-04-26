import { ClientSchema, searchEmail } from '../models/clientModel.js'
import { scrypt, randomBytes, randomUUID } from 'node:crypto'

export const clientController = {
	auth: async (req, res) => {
		const { email, password } = req.body
		const item = await searchEmail(email)
		if (item === null) {
			return res.sendStatus(400)
		}
		const pass = item.toJSON().cl_contrasena
		if (pass === password) {
			const itemProfile = {
				nombre: item.cl_nombre + " " + item.cl_apellido,
				email: item.cl_email,
				// id: item.cl_id,
				telefono: item.cl_telefono,
				latitud: item.cl_latitud,
				longitud: item.cl_longitud,
			}
			return res.json(itemProfile)
		} else {
			return res.sendStatus(400)
		}
	},
	get: async (req, res) => {

	},
	delete: (req, res) => {
		const { id } = req.params
		if (id === '') return
		if (id === undefined) return

		const deleteQuery = 'DELETE FROM client WHERE emailclient = ?'//cambiar por el ID
		ClientSchema.sequelize.query(deleteQuery, {
			replacements: [id],
			type: ClientSchema.sequelize.QueryTypes.DELETE
		}).then((resp) => {
			res.status(200).json({ message: 'usuario eliminado', data: resp })
		}).catch((error) => {
			res.status(500).json({ message: 'ocurrio algo inesperado', error: error })
		})

	},
	get: (req, res) => {
		console.log('llegue al controlador')
		console.log(req.body)
	}
}
//localhost:3000/login/authentication