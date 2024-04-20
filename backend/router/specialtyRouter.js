import express from 'express';
import { specialtyController } from '../controllers/specialtyController.js';

export const specialtyRouter = express.Router()

specialtyRouter.get('/', specialtyController.get)