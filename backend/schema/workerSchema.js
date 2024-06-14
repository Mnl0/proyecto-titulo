import { object, string } from 'yup';

export const createWorker = object({
	email: string().required(),
	firstName: string().required(),
	password: string().required(),
	lastName: string().required(),
	cellPhone: string().required(),
	address: string().required(),
})

export const auth = object({
	email: string().required(),
	password: string().required(),
})

export const validateIfRecover = object({
	email: string().required(),
	firtName: string().required(),
	cellPhone: string().required()
})

export const recoverPass = object({
	password: string().required()
})

export const idParams = object({
	id: string().required()
})

