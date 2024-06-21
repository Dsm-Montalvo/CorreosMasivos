import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Seguridadsocial = db.define('seguridadsocial',{
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    abreviatura:{
        type:DataTypes.STRING(10),
        allowNull:false
    }
  
})

export default Seguridadsocial