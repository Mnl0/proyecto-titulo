import { object, string, number } from 'yup';

//=====probar schema create auth
export const createClient = object({
	cl_firtName: string().required(),
	cl_lastName: string().required(),
	cl_email: string().required(),
	cl_password: string().required(),
	cl_direccion: string().required(),
});

export const authClient = object({
	cl_email: string().required(),
	cl_password: string().required()
})

