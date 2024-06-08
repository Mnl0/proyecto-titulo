import express from 'express'
import { categoryController } from '../controllers/categoryController.js'

export const categoryRouter = express.Router();

//http://localhost:3000/api/category/getAll
categoryRouter.get('/getAll', categoryController.getAll);