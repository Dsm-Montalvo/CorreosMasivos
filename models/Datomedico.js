import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Datomedico = db.define('datomedico',{
    enfermedad:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ruidosonido:{
        type:DataTypes.STRING,
        allowNull:false
    },
     familiarusausado:{
        type:DataTypes.STRING,
        allowNull:false
    },
     ladoescucha:{
        type:DataTypes.STRING,
        allowNull:false
    },
     exposicion:{
        type:DataTypes.STRING,
        allowNull:false
    },
     tiporuido:{
        type:DataTypes.STRING,
        allowNull:false
    },
     diagnostico:{
        type:DataTypes.STRING,
        allowNull:false
    },  
    
})

export default Datomedico