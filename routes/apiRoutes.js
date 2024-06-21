import express from 'express'
import { pacientes } from '../controllers/apiController.js'
const router =express.Router()

router.get('/pacientes',pacientes)


export default router