import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Escolaridad = db.define('escolaridad',{
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    }
})

export default Escolaridad