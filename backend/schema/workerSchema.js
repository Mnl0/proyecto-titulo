import { object, string, number } from 'yup';

export const createWorker = object({
	wr_email: string().required(),
	wr_firtName: string().required(),
	wr_password: string().required(),
	wr_lastName: string().optional(),
	wr_cellphone: number().optional(),
	wr_direccion: string().optional(),
})

export const auth = object({
	wr_email: string().required(),
	wr_password: string().required(),
})

export const validateIfRecover = object({
	wr_email: string().required(),
	wr_firtName: string().required(),
	wr_cellphone: string().required()
})

export const recoverPass = object({
	wr_password: string().required()
})

