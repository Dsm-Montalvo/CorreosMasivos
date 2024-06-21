import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Medios = db.define('medios',{
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    },

})
export default Medios