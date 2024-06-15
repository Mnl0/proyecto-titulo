import express from 'express';
import { clientController } from '../controllers/clientController.js';
import { middlewareValidateBody, middlewareValidateHeader, middlewareValidateParams } from '../middleware/schemaMiddleware.js';
import { authClient, createClient, idParams, recoverPass, validateRecover } from '../schema/clienSchema.js';

//ejemplo ruta
//http://localhost:3000/api/[controller]/[metodo]
export const clientRouter = express.Router();
clientRouter.post('/auth', middlewareValidateBody(authClient), clientController.auth);
clientRouter.post('/create', middlewareValidateBody(createClient), clientController.create);
clientRouter.post('/validateRecover', middlewareValidateBody(validateRecover), clientController.validateIfRecoverPass);
clientRouter.post('/recover', middlewareValidateBody(recoverPass), clientController.recoverPass);

clientRouter.get('/profile/:id', middlewareValidateParams(idParams), clientController.getProfileOnlyDb);

// clientRouter.put('/editProfile/:id', clientController.editProfile);
clientRouter.put('/addImageOrEditInServer/:id', middlewareValidateHeader(), clientController.addImageOrEditInServer);
clientRouter.put('/addImageOrEditInDb/:id', middlewareValidateHeader(), clientController.addImageOrEditInDb);

clientRouter.post('getService', clientController.getService);

clientRouter.delete('/delete/:id', clientController.delete)//puede

//el usuario eliminar su propia cuenta ?
//las cuentas no se eliminan se desactivan