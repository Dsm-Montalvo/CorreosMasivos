import express from 'express';
import csrf from 'csurf'
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import pacientesRoutes from './routes/pacientesRoutes.js';
import datosRoutes from './routes/datosRoutes.js'
import superRoutes from './routes/superRoutes.js';

import appRoutes from './routes/appRoutes.js';
import apiRoutes from './routes/apiRoutes.js'

import db from './config/db.js';

// crear la app
const app = express();

//habilitar lectura de datos de formularios
app.use(express.urlencoded({extended:true}))

//habilitar cookie parser
app.use(cookieParser())

//habilitar CSRF
app.use(csrf({cookie: true}))


//Conexion ala base de datos
try{
    await db.authenticate();
    db.sync()
    console.log('Conexion correcta ala base de datos')

} catch (error) {
    console.log(error)
}

// Habilitar pug 
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta publica
app.use(express.static('public'))

// Routing
app.use('/',appRoutes)
app.use('/auth', usuarioRoutes)
app.use('/',pacientesRoutes)
app.use('/',superRoutes)
app.use('/', datosRoutes)

app.use('/api', apiRoutes)

//Definir puerto 
const port = process.env.PORT || 10000;

app.listen(port, () =>{
 console.log(`El servidor esta funcionando en el puerto ${port}`)   
});