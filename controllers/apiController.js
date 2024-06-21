import { Companyseguros,Paciente,Titularseguridadsocial,Seguridadsocial,Usuario} from '../models/index.js'

const pacientes = async (req,res)=>{

    const pacientes = await Paciente.findAll({
        include:[
            {model:Companyseguros,as:'companyseguro'},
            {model:Titularseguridadsocial,as:'titularseguridadsocial'},
            {model:Seguridadsocial,as:'seguridadsocial'}
        ]

    })


    res.json(pacientes)
}

export{
    pacientes
}