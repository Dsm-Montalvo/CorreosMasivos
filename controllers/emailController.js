// controllers/emailController.js
/* const nodemailer = require('nodemailer');
const User = require('../models/Donadores'); */
import nodemailer from 'nodemailer';
import Donadores from '../models/Donadores.js';
import { validationResult } from 'express-validator';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';
import { Op } from 'sequelize';
import MensajesPredefinidos from '../models/MensajePredefinidos.js';

const sendEmails = async (req, res) => {
  const { subject, message, alias } = req.body;

  try {
    const users = await Donadores.findAll();

    if (!users.length) {
        return res.status(404).render('admin/emailForm', {
            pagina: 'Enviar Correos Masivos',
            csrfToken: req.csrfToken(),
            datos: req.body,
            errores: [{ msg: 'No hay usuario en la Base de datos' }],
            mensajes: []
          });
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail', // o el servicio que estés usando
      auth: {
        user: process.env.EMAIL_USER2,
        pass: process.env.EMAIL_PASS2,
      },
    });

   /*  let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true para usar SSL/TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      }); */

    users.forEach(Donadores => {
      let mailOptions = {
        from: `"${alias}" <${process.env.EMAIL_USER}>`,
        to: Donadores.gmaildonador,
        subject: subject,
        text: message,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`Error sending to ${Donadores.gmaildonador}: ${error}`);
        } else {
          console.log(`Email sent to ${Donadores.gmaildonador}: ${info.response}`);
        }
      });
    });

    res.render('admin/super', {
        pagina: 'Inicio',
        csrfToken: req.csrfToken(),
        datos: {},
        errores: [],
        mensajes: [{ msg: 'Emails enviados Correctamente' }]
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).render('admin/super', {
        pagina: 'Inicio',
        csrfToken: req.csrfToken(),
        datos: req.body,
        errores: [{ msg: 'Internal server error' }],
        mensajes: []        
      });
    }
};

const crearCorreo = async(req,res) =>{
   res.render('admin/emailForm',{
        pagina: 'Enviar Correos Masivos',
        csrfToken: req.csrfToken(), // usandp CSRF Proteccion
        datos:{},  // Otros datos que quieras pasar
        errores: [],//pasa una lista de errores incialemnte
        mensajes: [] 
   });
};

const crearDonador = async (req, res) => {
  res.render('admin/addDonador', {
      pagina: 'Agregar a Lista de Correos',
      csrfToken: req.csrfToken(),
      datos: {}, // Datos iniciales
      errores: [],//pasa una lista de errores incialemnte
      mensajes: []
  });
};

const guardarDonador = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.render('admin/addDonorForm', {
          pagina: 'Agregar a Lista de Correos',
          csrfToken: req.csrfToken(),
          datos: req.body,
          errores: errors.array()
      });
  }

  try {
      await Donadores.create(req.body);
      res.render('admin/super',{
          pagina: 'Inicio',
          csrfToken: req.csrfToken(),
          datos: {}, 
          errores: [],
          mensajes: [{ msg: 'Donador agregado con exito.' }]
      }); // Redirige a la página de correos después de agregar el donador
  } catch (error) {
      console.error('Error al guardar el donador:', error);
      res.render('admin/super', {
          pagina: 'Inicio',
          csrfToken: req.csrfToken(),
          datos: req.body,
          errores: [{ msg: 'Error al guardar el donador' }],
          mensajes: []      
      });
  }
};

const mostrarDonadores = async (req, res) => {
  try {
    const donadores = await Donadores.findAll();
    res.render('admin/verDonadores', {
      pagina: 'Lista de Donadores',
      donadores
    });
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).render('admin/verDonadores', {
      pagina: 'Lista de Donadores',
      errores: [{ msg: 'Internal server error' }],
      donadores: []
    });
  }
};


const eliminarDonador = async (req, res) => {
  try {
    await Donadores.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/donadores/ver');
  } catch (error) {
    console.error('Error deleting donor:', error);
    res.status(500).render('admin/verDonadores', {
      pagina: 'Lista de Donadores',
      errores: [{ msg: 'Error deleting donor' }],
      donadores: []
    });
  }
};

const editarDonador = async (req, res) => {
  try {
    const donador = await Donadores.findByPk(req.params.id);
    if (!donador) {
      return res.status(404).render('admin/verDonadores', {
        pagina: 'Lista de Donadores',
        errores: [{ msg: 'Donador no encontrado' }],
        donadores: []
      });
    }

    res.render('admin/editDonador', {
      pagina: 'Editar Donador',
      csrfToken: req.csrfToken(),
      datos: donador,
      errores: [],
      mensajes: []
    });
  } catch (error) {
    console.error('Error fetching donor:', error);
    res.status(500).render('admin/verDonadores', {
      pagina: 'Lista de Donadores',
      errores: [{ msg: 'Error fetching donor' }],
      donadores: []
    });
  }
};

const actualizarDonador = async (req, res) => {
  const { nombre, gmaildonador, telefono, telcontacto, empresa, montodonado } = req.body;

  try {
    const donador = await Donadores.findByPk(req.params.id);
    if (!donador) {
      return res.status(404).render('admin/verDonadores', {
        pagina: 'Lista de Donadores',
        errores: [{ msg: 'Donador no encontrado' }],
        donadores: []
      });
    }

    donador.nombre = nombre;
    donador.gmaildonador = gmaildonador;
    donador.telefono = telefono;
    donador.telcontacto = telcontacto;
    donador.empresa = empresa;
    donador.montodonado = montodonado;
    await donador.save();

    res.redirect('/admin/donadores/ver');
  } catch (error) {
    console.error('Error updating donor:', error);
    res.status(500).render('admin/editDonador', {
      pagina: 'Editar Donador',
      csrfToken: req.csrfToken(),
      datos: req.body,
      errores: [{ msg: 'Error updating donor' }],
      mensajes: []
    });
  }
};

const verMensajesPredefinidos = async (req, res) => {
  try {
    const mensajes = await MensajesPredefinidos.findAll();
    const hayMensajes = mensajes.length > 0;

     // Truncar mensajes a 15 caracteres
     const mensajesTruncados = mensajes.map(mensaje => ({
      ...mensaje.toJSON(),
      mensaje: mensaje.mensaje.length > 15 ? mensaje.mensaje.substring(0, 15) + '...' : mensaje.mensaje
    }));

    res.render('admin/verMensajes', {
      pagina: 'Mensajes Predefinidos',
      csrfToken: req.csrfToken(),
      mensajes: mensajesTruncados,
      hayMensajes
    });
  } catch (error) {
    console.error('Error al obtener los mensajes predefinidos:', error);
    res.status(500).render('admin/verMensajes', {
      pagina: 'Mensajes Predefinidos',
      csrfToken: req.csrfToken(),
      mensajes: [],
      hayMensajes: false,
      errores: [{ msg: 'Error interno del servidor' }]
    });
  }
};

const crearMensajePredefinido = async (req, res) => {
  res.render('admin/crearMensaje', {
    pagina: 'Crear Mensaje Predefinido',
    csrfToken: req.csrfToken(),
    errores: []
  });
};

const guardarMensajePredefinido = async (req, res) => {
  const { alias, asunto, mensaje } = req.body;
  const errores = [];

  if (!alias) {
    errores.push({ msg: 'El alias del mensaje es obligatorio' });
  }

  if (!asunto) {
    errores.push({ msg: 'El asunto del mensaje es obligatorio' });
  }

  if (!mensaje) {
    errores.push({ msg: 'El contenido del mensaje es obligatorio' });
  }

  if (errores.length > 0) {
    return res.render('admin/crearMensaje', {
      pagina: 'Crear Mensaje Predefinido',
      csrfToken: req.csrfToken(),
      errores
    });
  }

  try {
    await MensajesPredefinidos.create({ alias, asunto, mensaje });
    res.redirect('/admin/mensajes');
  } catch (error) {
    console.error('Error al guardar el mensaje predefinido:', error);
    res.status(500).render('admin/crearMensaje', {
      pagina: 'Crear Mensaje Predefinido',
      csrfToken: req.csrfToken(),
      errores: [{ msg: 'Error interno del servidor' }]
    });
  }
};

const editarMensajePredefinido = async (req, res) => {
  try {
    const mensaje = await MensajesPredefinidos.findByPk(req.params.id);

    if (!mensaje) {
      req.flash('error', 'Mensaje no encontrado');
      return res.redirect('/admin/mensajes');
    }

    res.render('admin/editarMensaje', {
      pagina: 'Editar Mensaje Predefinido',
      csrfToken: req.csrfToken(),
      mensaje
    });
  } catch (error) {
    console.error('Error al obtener el mensaje predefinido:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const guardarCambiosMensajePredefinido = async (req, res) => {
  const { alias, asunto, mensaje: nuevoMensaje } = req.body;

  try {
    const mensaje = await MensajesPredefinidos.findByPk(req.params.id);

    if (!mensaje) {
      return res.status(404).render('admin/verMensajes', {
        pagina: 'Lista de Mensajes Predefinidos',
        errores: [{ msg: 'Mensaje no encontrado' }],
        mensajes: []
      });
    }

    mensaje.alias = alias;
    mensaje.asunto = asunto;
    mensaje.mensaje = nuevoMensaje;
    await mensaje.save();

    res.redirect('/admin/mensajes');
  } catch (error) {
    console.error('Error al guardar los cambios del mensaje predefinido:', error);

    res.status(500).render('admin/editarMensaje', {
      pagina: 'Editar Mensaje Predefinido',
      csrfToken: req.csrfToken(),
      mensaje: req.body,
      errores: [{ msg: 'Error interno del servidor' }]
    });
  }
};


const eliminarMensajePredefinido = async (req, res) => {
  try {
    const mensaje = await MensajesPredefinidos.findByPk(req.params.id);

    if (!mensaje) {
      return res.status(404).render('admin/verMensajes', {
        pagina: 'Lista de Mensajes Predefinidos',
        errores: [{ msg: 'Mensaje no encontrado' }],
        mensajes: []
      });
    }

    await mensaje.destroy();
    res.redirect('/admin/mensajes');
  } catch (error) {
    console.error('Error al eliminar el mensaje predefinido:', error);
    res.status(500).render('admin/verMensajes', {
      pagina: 'Lista de Mensajes Predefinidos',
      errores: [{ msg: 'Error al eliminar el mensaje predefinido' }],
      mensajes: []
    });
  }
};

const utilizarMensajePredefinido = async (req, res) => {
  try {
    const mensaje = await MensajesPredefinidos.findByPk(req.params.id);

    if (!mensaje) {
      req.flash('error', 'Mensaje no encontrado');
      return res.redirect('/admin/mensajes');
    }

    res.render('admin/utilizarMensaje', {
      pagina: 'Utilizar Mensaje Predefinido',
      csrfToken: req.csrfToken(),
      mensaje
    });
  } catch (error) {
    console.error('Error al obtener el mensaje predefinido:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const enviarEmail = async (req, res) => {
  try {
    const { mensajeId, alias } = req.body;
    const mensaje = await MensajesPredefinidos.findByPk(mensajeId);

    if (!mensaje) {
      return res.render('admin/verMensajes', {
        pagina: 'Mensajes Predefinidos',
        csrfToken: req.csrfToken(),
        mensajes: [],
        errores: [{ msg: 'Mensaje no encontrado' }]
      });
    }

    const donadores = await Donadores.findAll();

    if (!donadores.length) {
      return res.render('admin/verMensajes', {
        pagina: 'Mensajes Predefinidos',
        csrfToken: req.csrfToken(),
        mensajes: [],
        errores: [{ msg: 'No hay donadores en la base de datos' }]
      });
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail', // o el servicio que estés usando
      auth: {
        user: process.env.EMAIL_USER2,
        pass: process.env.EMAIL_PASS2,
      },
    });

    donadores.forEach(donador => {
      let mailOptions = {
        from: `"${alias}" <${process.env.EMAIL_USER}>`, // Use the alias from req.body
        to: donador.gmaildonador,
        subject: mensaje.asunto,
        text: mensaje.mensaje,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(`Error sending to ${donador.gmaildonador}: ${error}`);
        } else {
          console.log(`Email sent to ${donador.gmaildonador}: ${info.response}`);
        }
      });
    });

    res.render('admin/super', {
      pagina: 'Inicio',
      csrfToken: req.csrfToken(),
      datos: {},
      errores: [],
      mensajes: [{ msg: 'Emails enviados Correctamente' }]
    });
    } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).render('admin/super', {
      pagina: 'Inicio',
      csrfToken: req.csrfToken(),
      datos: req.body,
      errores: [{ msg: 'Internal server error' }],
      mensajes: []        
    });
    }
};


const noEncontrado = (req, res) => {
  res.render('404', {
      pagina: 'No Encontrada',
      csrfToken: req.csrfToken()
  })
}

const superUsuario = (req, res) => {
  res.render('admin/super', {
    pagina: 'Inicio',
    csrfToken: req.csrfToken(),
  });
};

const generarPDF = async (req, res) => {
  try {
      const donadores = await Donadores.findAll();

      if (!donadores.length) {
          return res.status(404).send('No hay donadores registrados.');
      }

      const doc = new PDFDocument();
      let filename = `donadores_${Date.now()}.pdf`;
      filename = encodeURIComponent(filename);
      
      res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/pdf');

      doc.fontSize(16).text('Lista de Donadores', { align: 'center' });
      doc.moveDown();

      donadores.forEach(donador => {
          doc.fontSize(12).text(`Nombre: ${donador.nombre}`);
          doc.fontSize(12).text(`Correo Electrónico: ${donador.gmaildonador}`);
          doc.fontSize(12).text(`Teléfono: ${donador.telefono}`);
          doc.fontSize(12).text(`Teléfono de Contacto: ${donador.telcontacto}`);
          doc.fontSize(12).text(`Empresa: ${donador.empresa}`);
          doc.moveDown();
      });

      doc.pipe(res);
      doc.end();

  } catch (error) {
      console.error(error);
      res.status(500).send('Error al generar el PDF');
  }
};

const generarExcel = async (req, res) => {
  try {
      const donadores = await Donadores.findAll();

      if (!donadores.length) {
          return res.status(404).send('No hay donadores registrados.');
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Donadores');

      worksheet.columns = [
          { header: 'Nombre', key: 'nombre', width: 30 },
          { header: 'Correo Electrónico', key: 'gmaildonador', width: 30 },
          { header: 'Teléfono', key: 'telefono', width: 20 },
          { header: 'Teléfono de Contacto', key: 'telcontacto', width: 20 },
          { header: 'Empresa', key: 'empresa', width: 30 },
      ];

      donadores.forEach(donador => {
          worksheet.addRow(donador);
      });

      let filename = `donadores_${Date.now()}.xlsx`;
      filename = encodeURIComponent(filename);
      
      res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      await workbook.xlsx.write(res);
      res.end();

  } catch (error) {
      console.error(error);
      res.status(500).send('Error al generar el Excel');
  }
};

const listarDonadores = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Página actual, default: 1
  const limit = 10; // Número de registros por página
  const offset = (page - 1) * limit; // Offset para la consulta

  try {
      // Consulta a la base de datos para obtener los donadores paginados
      const donadores = await Donadores.findAndCountAll({
          offset,
          limit,
          order: [['createdAt', 'DESC']], // Ordenar según necesidad
      });

      const totalPages = Math.ceil(donadores.count / limit); // Total de páginas

      res.render('admin/verDonadores', {
          pagina: 'Listado de Donadores',
          donadores: donadores.rows,
          currentPage: page,
          totalPages,
      });
  } catch (error) {
      console.error('Error al obtener donadores:', error);
      res.render('admin/verDonadores', {
          pagina: 'Listado de Donadores',
          errores: [{ msg: 'Error al obtener donadores.' }],
      });
  }
};


export{
    crearCorreo,
    sendEmails,
    crearDonador,
    guardarDonador,
    mostrarDonadores,
    eliminarDonador,
    editarDonador,
    actualizarDonador,
    verMensajesPredefinidos,
    crearMensajePredefinido,
    guardarMensajePredefinido,
    editarMensajePredefinido,
    eliminarMensajePredefinido,
    utilizarMensajePredefinido,
    guardarCambiosMensajePredefinido,
    enviarEmail,
    noEncontrado,
    superUsuario,
    generarPDF,
    generarExcel,
    listarDonadores
}