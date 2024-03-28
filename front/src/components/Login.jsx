import React, { useState } from 'react'
import './Login.css'

export const Login = () => {

	const [value, setValue] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		// console.log(event.target.username.value)
		setValue(event.target.username.value)

		const username = value
		fetch('http://localhost:3000/login/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username }),
		})
		console.log(username)
	}

	const handleChange = (event) => {
		// setValue(e.target.value)
	}

	return (
		<div>

			<section onSubmit={(event) => handleSubmit(event)}>
				<h2>Login</h2>
				<form>
					<input
						type='text'
						name='username'
						placeholder='ingresa el nombre de usuario'
						onChange={(e) => handleChange(e)}
					/>
					<button type='submit'>Enviar</button>
				</form>
			</section>
			<section>
				<h2>hola mundo</h2>
			</section>
		</div>

	)
}
