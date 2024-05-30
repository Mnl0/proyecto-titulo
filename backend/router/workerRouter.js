import express from 'express'
import { workerController } from '../controllers/workerController.js'

export const workerRouter = express.Router()

workerRouter.post('/create', workerController.create);
workerRouter.post('/auth', workerController.auth);
workerRouter.post('/validateRecover', workerController.validateIfRecoverPass);
workerRouter.post('/recover', workerController.recoverPass);