import express from 'express';
import { clientSchema } from '../controllers/clientController.js';

export const clientRouter = express.Router();

clientRouter.post('/auth', clientSchema.create)
clientRouter.delete('/delete/:id', clientSchema.delete)//puede el usuario eliminar su propia cuenta?
clientRouter.get('/:id', clientSchema.get)