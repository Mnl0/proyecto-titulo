import { Cliente } from '../models/clienteModel.js'

export const clienteSchema = {
	login: (req, res) => {
		const { username } = req.body
		if (username.length === 0) {
			return res.status(400).json({ message: 'no se ha enviado ningun valor' })
		}
		Cliente.create({ id: 5, nombre_completo: username })
			.then((newUser) => {
				res.status(200).json({ message: 'usuario creado', data: newUser })
			}).then((error) => {
				res.status(500).json({ message: 'error al insertar' })
			})
	}
}
//localhost:3000/login/authentication