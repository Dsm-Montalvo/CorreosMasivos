import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Serviciorequerido = db.define('serviciorequerido',{
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    abreviatura:{
        type:DataTypes.STRING(10),
        allowNull:false
    }
  
})

export default Serviciorequerido