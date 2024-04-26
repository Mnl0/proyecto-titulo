import express from 'express'
import { workerController } from '../controllers/workerController.js'

export const workerRouter = express.Router()

workerRouter.post('/auth', workerController.auth)