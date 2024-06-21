import express from 'express'
import {completado,crearBeneficiario, datosMedicos, guardarBeneficiario,guardarDatosMedicos,donadores} from '../controllers/datosController.js'
import protegerRuta from '../middleware/protegerRuta.js';

const router =express.Router()


router.get('/pacientes/completado/:id',protegerRuta, completado)

//
router.get('/pacientes/beneficiario/:id',protegerRuta,crearBeneficiario)
router.post('/pacientes/beneficiario/:id',protegerRuta,guardarBeneficiario)


router.get('/pacientes/datosmedicos/:id',protegerRuta,datosMedicos)
router.post('/pacientes/datosmedicos/:id',protegerRuta,guardarDatosMedicos)

router.get('/donadores', donadores)


export default router