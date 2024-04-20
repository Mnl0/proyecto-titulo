import express from 'express';
import { necessityController } from '../controllers/necessityController.js';

export const necessityRouter = express.Router();
necessityRouter.get('/', necessityController.get)
