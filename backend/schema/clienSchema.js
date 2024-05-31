import { object, string, number } from 'yup';

export const createClient = object({
	cl_email: string().required(),
	cl_firtName: string().required(),
	cl_password: string().required(),
	cl_lastName: string().optional(),
	cl_cellphone: string().optional(),
	cl_direccion: string().required(),
});

export const authClient = object({
	cl_email: string().required(),
	cl_password: string().required()
})

export const validateRecover = object({
	cl_email: string().required(),
	cl_firtName: string().required(),
	cl_cellphone: string().required()
})

export const recoverPass = object({
	cl_password: string().required(),
})