import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Canalesreferencia= db.define('canalesreferencia',{
    nombre:{
        type:DataTypes.STRING(50),
        allowNULL:false

    }
})
export default Canalesreferencia