import { ClientSchema, buscEmail, buscarPorEmail } from '../models/clientModel.js'
import { scrypt, randomBytes, randomUUID } from 'node:crypto'

export const clientController = {
	auth: async (req, res) => {
		const { email, password } = req.body
		// const a = await buscarPorEmail(cl_email)
		// console.log(a.toJSON())
		// console.log(a)
		// buscEmail(email).then(e => {
		// 	console.log(e.toJSON())
		// })
		const a = await buscEmail(email)
		if (a === null) {
			console.log('es null', a)
			return res.sendStatus(400)
		}

		console.log(JSON.stringify(a, null, 4))
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