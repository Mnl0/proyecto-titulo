import express from 'express';
import { jobHistoryController } from '../controllers/jobHistoryController.js';

export const jobHistoryRouter = express.Router();

jobHistoryRouter.post('/add', jobHistoryController.create);