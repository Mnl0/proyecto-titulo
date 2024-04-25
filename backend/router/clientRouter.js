import express from 'express';
import { clientController } from '../controllers/clientController.js';

export const clientRouter = express.Router();

clientRouter.post('/auth', clientController.auth)
clientRouter.delete('/delete/:id', clientController.delete)//puede el usuario eliminar su propia cuenta?
clientRouter.get('/:id', clientController.get)