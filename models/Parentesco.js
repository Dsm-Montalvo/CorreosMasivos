import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Parentesco = db.define('parentesco',{
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    
})

export default Parentesco