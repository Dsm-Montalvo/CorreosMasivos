import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'
import {generarId,generarJWT} from '../helpers/tokens.js'
import {emailRegistro,emailOlvidePassword} from '../helpers/emails.js'
import { where } from 'sequelize';

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar,
    confirmar,
    resetPassword,
    nuevoPassword,
    comprobarToken,
    autenticar,
    cerrarSesion
}


const formularioLogin = (req, res) =>{
    res.render('auth/login', {
        pagina:'Iniciar sesion',
        csrfToken: req.csrfToken(),
       

    })
}

const autenticar = async (req,res)=>{
    //validacion
    await check('email').isEmail().withMessage('El Correo es obligatorio').run(req)
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)
   
    let resultado = validationResult(req)

    //Verificar que el Resultado este vacio
    
    if(!resultado.isEmpty()){
        //errores
       return res.render('auth/login',{
        pagina:'Iniciar Sesion',
        csrfToken: req.csrfToken(),
        errores: resultado.array(),
       
       })
    }

    const {email,password}= req.body

    //comprobar si el usuario existe
    const usuario= await Usuario.findOne({where:{email}})
    if(!usuario){
        return res.render('auth/login',{
            pagina:'Iniciar sesion',
            csrfToken: req.csrfToken(),
            errores: [{msg:'el usuario no existe'}]
      })
    }else{
        
    }
    
    //comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        return res.render('auth/login',{
            pagina:'Iniciar sesion',
            csrfToken: req.csrfToken(),
            errores: [{msg:'Tu cuenta no a sido confirmada'}]
           })
    }

    //revisar el password
    if(!usuario.verificarPassword(password)){
        return res.render('auth/login',{
            pagina:'Iniciar sesion',
            csrfToken: req.csrfToken(),
            errores: [{msg:'El password es incorrecto'}]
           })
    }
    
 // Comprobar si el usuario es el super usuario
    if (email === "admin@admin.com") {
        // Redirigir al super usuario a otra vista
        const token = generarJWT({id: usuario.id, nombre : usuario.nombre})

    
        //almacenar en un cookie
        return res.cookie('_token', token,{
            httpOnly:true,
           
            // secure:true
        }).redirect('/')
    
    }

    //Autenticar al usuario
   const token = generarJWT({id: usuario.id, nombre : usuario.nombre})

    console.log(token)

    //almacenar en un cookie
    return res.cookie('_token', token,{
        httpOnly:true,
        // secure:true
    }).redirect('/')


}
const cerrarSesion=(req,res)=>{
    return res.clearCookie('_token').status(200).redirect('/auth/login')
}

const formularioRegistro = (req, res) =>{
    res.render('auth/registro', {
        pagina:'Crear cuenta',
        csrfToken: req.csrfToken()

    })
}

const registrar = async(req, res)=>{

    await check('nombre').notEmpty().withMessage('El Nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('El Correo es obligatorio').run(req)
    await check('password').isLength({min:6}).withMessage('La contraseña tiene que ser minimo de 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Las contraseñas No son iguales').run(req)

    let resultado = validationResult(req)

    //Verificar que el Resultado este vacio
    
    if(!resultado.isEmpty()){
        //errores
       return res.render('auth/registro',{
        pagina:'Crear Cuenta',
        csrfToken: req.csrfToken(),
        errores: resultado.array(),
        usuario:{
         nombre: req.body.nombre,
         email: req.body.email

        }

       })
    }

    //extraere los datops
    const{ nombre,email,password} = req.body
    //verificar que el usuario no este duplicado 
    const existeUsuario = await Usuario.findOne( {where: {email} })
    if(existeUsuario){
        return res.render('auth/registro',{
            pagina:'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: [{msg:'El Correo ya esta registrado'}],
            usuario:{
             nombre: req.body.nombre,
             email: req.body.email
    
            }
           })
    }
    //  console.log(existeUsuario)
    //  return;
         //crear tabla
            // const usuario = await Usuario.create(req.body)
            // res.json(usuario)

      //Almacenar un usuario
      const usuario= await Usuario.create({
        nombre,
        email,
        password,
        token:generarId()
      })  

      //envia email de confirmacion
      emailRegistro({
        nombre : usuario.nombre,
        email: usuario.email,
        token: usuario.token 

      })



      //mostrar mensaje de confirmacion
      res.render('templates/mensaje',{
        pagina:'Cuenta Creada Correctamente',
        mensaje:'hemos enviado un email de confirmacion ,presione el enlace para confirmar',
        error:true
      })
}

//funcioon de comprobar cuenta
const confirmar = async (req,res)=>{
    const{token} = req.params;
    // console.log(token)

    //verificar si el token es valido 
    const usuario = await Usuario.findOne({where:{token}})
    

    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina:'Erro al confirmar tu cuenta ',
            mensaje:'Hubo un error al confirmar tu cuenta'
          
        })
    }

    //confirmar la cueta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();
    // console.log(usuario)

    res.render('auth/confirmar-cuenta',{
        pagina:'Cuenta confirmada ',
        mensaje:'La cuenta del usuario se confirmo correctamente'
      
    })

}

const formularioOlvidePassword = (req, res) =>{
    res.render('auth/olvide-password', {
        pagina:'Recupera tu acceso a Fundacion Mexico Sin Sordera A.C',
        csrfToken: req.csrfToken()

    })
}


const resetPassword = async (req , res )=>{
    //validacion
    await check('email').isEmail().withMessage('El Correo es obligatorio').run(req)
   
    let resultado = validationResult(req)

    //Verificar que el Resultado este vacio
    if(!resultado.isEmpty()){
        //errores
       return res.render('auth/olvide-password',{
        pagina:'Recupera tu acceso a Fundacion Mexico Sin Sordera A.C',
        csrfToken: req.csrfToken(),
        errores: resultado.array()

       })
    }
    //buscar el uusario
    const{ email } = req.body

    const usuario = await Usuario.findOne({where: {email}})
    if(!usuario){
        return res.render('auth/olvide-password',{
            pagina:'Recupera tu acceso a Fundacion Mexico Sin Sordera A.C',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El email no pertenece a ningun usuario'}]
    
           })
    }

    //generar token y enviar el email
    usuario.token = generarId();
    await usuario.save();
    //enviar email
    emailOlvidePassword({
        email:usuario.email,
        nombre: usuario.nombre,
        token:usuario.token
    })

    //Mostrar mensaje de confirmacion
    res.render('templates/mensaje',{
        pagina:'Restablcer tu Password',
        mensaje:'Hemos enviado  un correo de recuperacion de password '
      
    })

}

const comprobarToken = async(req,res,next) =>{
const{token}= req.params;

const usuario = await Usuario.findOne({where: {token}})
if(!usuario){
    return res.render('auth/confirmar-cuenta',{
        pagina:'Restablce tu password',
        mensaje:'Hubo un error al validar tu informacion internta de  nuevo',
        error: true
      
    })
}

//mostrar formulario para modificar el password
res.render('auth/reset-password',{
    pagina:'Restablece tu contraseña',
    csrfToken: req.csrfToken(),
})
}

const nuevoPassword = async (req,res) =>{
    //validar nuevo password
    await check('password').isLength({min:6}).withMessage('El password debe ser de al menos 6 caracteres').run(req)

    let resultado = validationResult(req)

    //Verificar que el Resultado este vacio
    
    if(!resultado.isEmpty()){
        //errores
       return res.render('auth/reset-password',{
        pagina:'Reestablece tu password',
        csrfToken: req.csrfToken(),
        errores: resultado.array
       })
    }

    const{token} =req.params;
    const{password}=req.body;

 //Identificar quien hace el cambio
    const usuario = await Usuario.findOne({where:{token}})

    //Hashear el nuevo password
    const salt= await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt);

    usuario.token=null

    await usuario.save();

    res.render('auth/confirmar-cuenta',{
        pagina:'Contraseña Restablecida',
        mensaje:'El password se Guardo correctamente'

    })

}

const envioMasivoMails = async (req,res)=>{
    
}