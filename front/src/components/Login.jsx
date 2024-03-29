import React, { useState } from 'react'
const host = `http://localhost:3000/api/login`
const url = `${host}/delete`
export const Login = () => {

	const [value, setValue] = useState([])
	const [valueDelete, setValueDelete] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		// const username = value
		// fetch(url, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({ username }),
		// })
		// console.log(username)
	}

	const handleChange = (event) => {
		setValue((prev) => {
			return {
				...prev,
				[event.target.name]: event.target.value,
			}
		})
		console.log(value)
	}

	const handleChangeDelete = (event) => {
		setValueDelete(valueDelete);
		console.log(valueDelete)
	}

	return (
		<div>

			<section onSubmit={(event) => handleSubmit(event)}>
				<h2>Login</h2>
				<form>
					<input
						type='text'
						name='firt name'
						placeholder='firt name'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='text'
						name='last name'
						placeholder='last name'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='text'
						name='phone'
						placeholder='phone'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='text'
						name='email'
						placeholder='email'
						onChange={(e) => handleChange(e)}
					/>
					<button type='submit'>Enviar</button>
				</form>

				<form onSubmit={(event) => handleSubmit(event)}>
					<input
						type='number'
						name='idclient'
						placeholder='id a eliminar'
						onChange={(e) => handleChangeDelete(e)}
					/>
					<button type='submit'>Enviar</button>
				</form>
			</section>
		</div>

	)
}
