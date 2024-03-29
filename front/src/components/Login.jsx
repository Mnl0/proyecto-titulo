import React, { useState } from 'react'
const host = `http://localhost:3000/api/login`
const urlDelete = `${host}/delete`
const urlCreate = `${host}/auth`
export const Login = () => {

	const [value, setValue] = useState({
		firtName: '',
		lastName: '',
		phone: '',
		email: '',
	})
	const [valueDelete, setValueDelete] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		const { firtName, lastName, phone, email } = value;
		setValue({
			firtName: firtName,
			lastName: lastName,
			phone: phone,
			email: email,
		})
		if (value.firtName === '') return
		if (value.lastName === '') return
		if (value.phone === '') return
		if (value.email === '') return
		fetch(urlCreate, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(value),
		})
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

	const handleSubmitDelete = (event) => {
		event.preventDefault()
		const idclient = valueDelete;
		console.log(idclient)
		if (idclient === undefined || idclient === '') return
		fetch(`${urlDelete}/${idclient}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then((resp) => {
			console.log(resp)
		}).catch((error) => {
			console.log(error)
		})
	}

	const handleChangeDelete = (event) => {
		setValueDelete(event.target.value);
	}

	return (
		<div>
			<section onSubmit={(event) => handleSubmit(event)}>
				<h2>Login</h2>
				<form>
					<input
						type='text'
						name='firtName'
						placeholder='firt name'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='text'
						name='lastName'
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

				<form onSubmit={(event) => handleSubmitDelete(event)}>
					<input
						type='text'
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
