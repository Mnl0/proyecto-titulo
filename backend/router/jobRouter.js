import express from 'express'
import { jobController } from '../controllers/jobController.js'

export const jobRouter = express.Router()

jobRouter.get('/', jobController.get)