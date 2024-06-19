import express from 'express'
import { workerController } from '../controllers/workerController.js'
import { middlewareValidateBody } from '../middleware/schemaMiddleware.js';
import { auth, createWorker, recoverPass, validateIfRecover } from '../schema/workerSchema.js';

export const workerRouter = express.Router()

////http://localhost:3000/api/worker/[metodo]
workerRouter.post('/create', middlewareValidateBody(createWorker), workerController.create);
workerRouter.post('/auth', middlewareValidateBody(auth), workerController.auth);
workerRouter.post('/validateRecover', middlewareValidateBody(validateIfRecover), workerController.validateIfRecoverPass);
workerRouter.post('/recover', middlewareValidateBody(recoverPass), workerController.recoverPass);

workerRouter.get('/profile/:id', workerController.getProfile);
workerRouter.put('/addImageOrEditInServer/:id', workerController.addImageOrEditInServer);
workerRouter.put('/addImageOrEditInDb/:id', workerController.addImageOrEditInDb);
workerRouter.get('/getAllForOccupation', workerController.getAllForOccupation);
workerRouter.post('/getAllForOccupation', workerController.getAllForOccupation);
