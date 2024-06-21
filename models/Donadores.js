import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Donadores = db.define('donadores',{
    nombre:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    gmaildonador:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    telefono:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    telcontacto:{
        type:DataTypes.STRING,
        allowNull:false
    },
    empresa:{
        type:DataTypes.STRING,
        allowNull:false
    },
    montodonado:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
})

export default Donadores