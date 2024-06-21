
import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Titularseguridadsocial = db.define('titularseguridadsocial',{
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    }
  
})

export default Titularseguridadsocial