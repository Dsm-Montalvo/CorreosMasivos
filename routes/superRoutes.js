import express from 'express'
import {body} from 'express-validator'
import protegerRuta from '../middleware/protegerRuta.js';
import upload from '../middleware/subirImagen.js';
import { sendEmails, crearCorreo, crearDonador, guardarDonador, mostrarDonadores, editarDonador,actualizarDonador, eliminarDonador, verMensajesPredefinidos, crearMensajePredefinido, guardarMensajePredefinido, editarMensajePredefinido, guardarCambiosMensajePredefinido, eliminarMensajePredefinido, utilizarMensajePredefinido, enviarEmail, noEncontrado, superUsuario } from '../controllers/emailController.js';

const router = express.Router();

router.get('/',protegerRuta, superUsuario)


router.get('/admin/emails',protegerRuta, crearCorreo)
router.post('/admin/emails',protegerRuta, sendEmails)

router.get('/admin/donadores/ver',protegerRuta, mostrarDonadores);
router.get('/admin/donadores/crear',protegerRuta, crearDonador)
router.post('/admin/donadores/crear', protegerRuta,
    body('nombre').notEmpty().withMessage('El Nombre es obligatorio'),
    body('gmaildonador').isEmail().withMessage('Debe ser un correo válido'),
    body('telefono').notEmpty().withMessage('El Teléfono es obligatorio'),
    body('telcontacto').notEmpty().withMessage('El Teléfono de Contacto es obligatorio'),
    body('empresa').notEmpty().withMessage('La Empresa es obligatoria'),
    body('montodonado').notEmpty().withMessage('El Monto Donado es obligatorio'),
    guardarDonador
);

router.get('/admin/donadores/editar/:id', protegerRuta, editarDonador);
router.post('/admin/donadores/editar/:id', protegerRuta, actualizarDonador);
router.get('/admin/donadores/eliminar/:id', protegerRuta, eliminarDonador);

router.get('/admin/mensajes', protegerRuta, verMensajesPredefinidos);
router.get('/admin/mensajes/crear', protegerRuta, crearMensajePredefinido);
router.post('/admin/mensajes/crear', protegerRuta,
  body('alias').notEmpty().withMessage('El alias del mensaje es obligatorio'),
  body('asunto').notEmpty().withMessage('El asunto del mensaje es obligatorio'),
  body('mensaje').notEmpty().withMessage('El contenido del mensaje es obligatorio'),
  guardarMensajePredefinido
);

router.get('/admin/mensajes/editar/:id', protegerRuta, editarMensajePredefinido);
router.post('/admin/mensajes/editar/:id',protegerRuta, guardarCambiosMensajePredefinido);
router.get('/admin/mensajes/eliminar/:id',protegerRuta, eliminarMensajePredefinido);
router.get('/admin/mensajes/utilizar/:id',protegerRuta, utilizarMensajePredefinido);
router.post('/admin/emails/enviar',protegerRuta, enviarEmail);

router.get('/404',noEncontrado)


export default router