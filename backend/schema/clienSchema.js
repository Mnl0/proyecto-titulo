import { object, string, number } from 'yup';

export const createClient = object({
	email: string().required(),
	firtName: string().required(),
	password: string().required(),
	lastName: string().optional(),
	cellPhone: string().optional(),
	address: string().required(),
});

export const authClient = object({
	email: string().required(),
	password: string().required()
})

export const validateRecover = object({
	email: string().required(),
	firtName: string().required(),
	cellphone: string().required()
})

export const recoverPass = object({
	password: string().required(),
})

export const idParams = object({
	id: string().required()
})