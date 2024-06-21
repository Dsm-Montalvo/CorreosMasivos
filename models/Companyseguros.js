import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Companyseguros = db.define('companyseguros',{
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    }
  
})

export default Companyseguros