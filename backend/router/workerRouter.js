import express from 'express'
import { workerSchema } from '../controllers/workerController.js'

export const workerRouter = express.Router()

workerRouter.post('/auth', workerSchema.create)