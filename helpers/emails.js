import nodemailer from 'nodemailer'

const emailRegistro = async(datos)=>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true para usar SSL/TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    //   console.log(datos)
    const{email, nombre, token } = datos
    const adminEmail = 'pm328617@gmail.com'; // Cambia esto por el email del administrador

    //enviar el email
    await transport.sendMail({
        from: 'danielmontalvo126@gmail.com',
        to:adminEmail,
        subject:'Confirma tu cuenta en FSFLMXsinfronteras.com',
        text:'Confirma tu cuenta en  FSFLMXsinfronteras.com',
        html:`
        <p>hola el usuario ${nombre},quiere que compruebes su cuenta en FSFLMXsinfronteras.com</p>
        <p>La cuenta ya esta lista,solo debes de confirmarla en el siguiente enlace </p>
        <a href="${process.env.BACKEND_URL}/auth/confirmar/${token}">Confirmar cuenta</a>

        <p>si no reconoce los datos ignorelos  </p>

        `
    })

}

const emailOlvidePassword = async(datos)=>{
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  //   console.log(datos)
  const{email, nombre, token } = datos
  //enviar el email
  await transport.sendMail({
      from: 'danielmontalvo126@gmail.com',
      to:email,
      subject:'Restablece tu contraseña en FSFLMXsinfronteras.com',
      text:'Restablece tu contraseña en  FSFLMXsinfronteras.com',
      html:`
      <p>hola ${nombre},Has solicitado restablcer tu password</p>
      <p>Sigue el siguiente enlcae para generar un password nuevo </p>
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Restablecer contraseña</a>

      <p>si tu no solicitaste el cambio de password ,puedes ignorar este mensaje </p>

      `
  })

}

const envioMasivo = async(datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const { email, nombre } = datos;

  await transport.sendMail({
    from: '79156b001@smtp-brevo.com',
    to: email,
    subject: '¡Gracias por tu apoyo a México sin Sordera! 🌟',
    html: `
      <p>Estimado/a ${nombre},</p>
      
      <p>Espero que este mensaje te encuentre bien.</p>
      
      <p>Quiero comenzar expresando nuestro más sincero agradecimiento por tu generosa contribución a la Fundación México sin Sordera. Gracias a tu apoyo, hemos podido continuar nuestra misión de mejorar la calidad de vida de personas con pérdida auditiva en todo el país. Tu donación ha marcado una gran diferencia y nos ha permitido alcanzar logros significativos.</p>
      
      <p>Tu compromiso con nuestra causa es invaluable y queremos que sepas cuánto apreciamos tu confianza y generosidad. Gracias a ti, hemos podido proporcionar audífonos, terapias de lenguaje y programas educativos que han cambiado vidas.</p>
      
      <p>Hoy, nos dirigimos a ti una vez más con la esperanza de contar nuevamente con tu apoyo. Estamos trabajando en nuevos proyectos que necesitan de la ayuda de personas comprometidas como tú para seguir adelante. ¿Te gustaría considerar realizar una nueva donación para continuar apoyando a nuestra comunidad?</p>
      
      <p>Cualquier contribución, grande o pequeña, será enormemente apreciada y nos ayudará a seguir brindando el apoyo que tantas personas necesitan. Si deseas hacer una donación, puedes hacerlo a través de nuestro sitio web <a href="#">www.tu-sitio-web.com/donaciones</a> o respondiendo a este correo para más información.</p>
      
      <p>Gracias nuevamente por tu generosidad y por ser parte de nuestra misión. Juntos, podemos continuar marcando una diferencia positiva en las vidas de muchas personas.</p>
      
      <p>Con gratitud,</p>
      
      <p>Fundación México sin Sordera A.C</p>
      <p><a href="mailto:contacto@fundacion.com">contacto@fundacion.com</a></p>
      <p><a href="tel:+1234567890">+1234567890</a></p>
      <p><a href="#">www.tu-sitio-web.com</a></p>
    `
  });
};

export{
    emailRegistro,
    emailOlvidePassword
}