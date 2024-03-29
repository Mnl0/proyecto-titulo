import { Client } from '../models/clientModel.js'

export const clientSchema = {
	create: (req, res) => {
		const { firtName, lastName, phone, email } = req.body
		if (firtName === '') return
		if (lastName === '') return
		if (phone === '') return
		if (email === '') {
			return res.status(400).json({ message: 'no deberia llegar al controlador sin datos mejorar validacion' })
		}
		const insertQuery = 'INSERT INTO client (nameclient, lastnameclient, phoneclient, emailclient) VALUES (?,?,?,?)'
		Client.sequelize.query(insertQuery, {
			replacements: [firtName, lastName, phone, email],
			type: Client.sequelize.QueryTypes.INSERT
		}).then((response) => {
			console.log(response)
			res.status(200).json({ message: 'usuario creado', data: response })
		}).catch((error) => {
			console.log(error)
			res.status(500).json({ message: 'ocurrio algo inesperado', error: error })
		})
	},
	delete: (req, res) => {
		const { id } = req.params
		console.log(id)
		return res.status(200).json({ message: 'llego al controlador ok' })
	}
}
//localhost:3000/login/authentication