import { object, string } from 'yup';

export const createClient = object({
	email: string().required(),
	firstName: string().required(),
	password: string().required(),
	lastName: string().required(),
	cellPhone: string().optional(),
	address: string().required(),
});

export const authClient = object({
	email: string().required(),
	password: string().required()
})

export const validateRecover = object({
	email: string().required(),
	firstName: string().required(),
	cellphone: string().required()
})

export const recoverPass = object({
	password: string().required(),
})

export const idParams = object({
	id: string().required()
})