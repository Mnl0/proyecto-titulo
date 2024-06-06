import express from 'express'
import { workerController } from '../controllers/workerController.js'
import { middlewareValidateBody } from '../middleware/schemaMiddleware.js';
import { auth, createWorker, recoverPass, validateIfRecover } from '../schema/workerSchema.js';

export const workerRouter = express.Router()

workerRouter.post('/create', middlewareValidateBody(createWorker), workerController.create);
workerRouter.post('/auth', middlewareValidateBody(auth), workerController.auth);
workerRouter.post('/validateRecover', middlewareValidateBody(validateIfRecover), workerController.validateIfRecoverPass);
workerRouter.post('/recover', middlewareValidateBody(recoverPass), workerController.recoverPass);