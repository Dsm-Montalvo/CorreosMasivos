import express from 'express'
import {  inicio,campaign,noEncontrado,buscador,buscadorcampaing,inicioprincipal} from '../controllers/appController.js'
import protegerRuta from '../middleware/protegerRuta.js';
const router =express.Router()

//Pagina de inicio
router.get('/inicio',protegerRuta,inicio)
router.get('/',inicioprincipal)


router.get('/campaign/:id',campaign)

router.get('/404', noEncontrado)

router.post('/buscador',buscador)
router.post('/buscadorcampaing', buscadorcampaing)


export default router