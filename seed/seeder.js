import {exit} from 'node:process';
import company from "./company.js";
import socialSegurity from './socialsegurity.js';
import titusegusocial from './titusegusocial.js';
import Parentesco from '../models/Parentesco.js';
import relationship from './relationship.js';
import Serviciorequerido from '../models/Serviciorequerido.js';
import requiredservice from './requiredservice.js';
import Medios from '../models/Medios.js';
import media from './media.js';
import Escolaridad from '../models/Escolaridad.js';
import leveleducation from './leveleducation.js';
import Ocupacion from '../models/Ocupacion.js';
import occupation from './occupation.js';
import usuarios from './usuarios.js';
import { Companyseguros,Titularseguridadsocial,Seguridadsocial, Donadores} from '../models/index.js'

import db from "../config/db.js";

const importarDatos = async()=>{
    try{
        //autenticar
        await db.authenticate()

        //Generar Las Columnas
        await db.sync()

        //Insertar los Datos
        await Promise.all([
            Companyseguros.bulkCreate(company),
          Seguridadsocial.bulkCreate(socialSegurity),
          Titularseguridadsocial.bulkCreate(titusegusocial),
          Parentesco.bulkCreate(relationship),
          Serviciorequerido.bulkCreate(requiredservice),
          Medios.bulkCreate(media),
          Escolaridad.bulkCreate(leveleducation),
          Ocupacion.bulkCreate(occupation),
        //   Donadores.bulkCreate(),
        ])
        console.log('Datos Importados Correctamente')
        exit()

    }catch(error){
        console.log(error)
        exit(1)

    }
}

const eliminarDatos = async()=>{
    try{
        //elimina los datos de cada tabla seleccionada
        // await Promise.all([
        //     Companyseguros.destroy({where:{},truncate:true}),
        // ])

        //elimina los datos de todas las tablas
         await db.sync({force:true})
        console.log('Datos eliminados correctamente');
        exit()
    }catch(error){
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}

if(process.argv[2] === "-e"){
    eliminarDatos();
}   