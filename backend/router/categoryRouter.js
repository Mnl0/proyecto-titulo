import express from 'express'
import { categoryController } from '../controllers/categoryController.js'

export const categoryRouter = express.Router();

categoryRouter.get('/all', categoryController.get);