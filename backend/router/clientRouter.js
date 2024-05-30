import express from 'express';
import { clientController } from '../controllers/clientController.js';
//ejemplo ruta
//http://localhost:3000/api/[controller]/[metodo]
export const clientRouter = express.Router();
clientRouter.post('/auth', clientController.auth);
clientRouter.post('/create', clientController.create);

clientRouter.delete('/delete/:id', clientController.delete)//puede

//el usuario eliminar su propia cuenta ?
//las cuentas no se eliminan se desactivan
clientRouter.get('/:id', clientController.get)