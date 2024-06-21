import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Beneficiario = db.define('beneficiario',{
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    firma:{
        type:DataTypes.STRING(50),
        allowNull:false
    }, 
   
    fechanacimiento:{
        type:DataTypes.STRING(50),
        allowNull:false
    }, 
    edad:{
        type:DataTypes.STRING(50),
        allowNull:false
    }, 
    meses:{
        type:DataTypes.STRING(50),
        allowNull:false
    }, 
   //escolaridad llave
   //ocupacion llave


})

export default Beneficiario