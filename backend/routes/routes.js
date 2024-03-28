import express from 'express';
import { clienteSchema } from '../controllers/clienteController.js';

export const clienteRouter = express.Router();

clienteRouter.post('/auth', clienteSchema.login)