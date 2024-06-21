import Seguridadsocial from "./Seguridadsocial.js";
import Companyseguros from "./Companyseguros.js";
import Titularseguridadsocial from "./Titularseguridadsocial.js";
import Usuario from './Usuario.js'
import Paciente from "./Paciente.js";
import Campaign from "./Campaign.js";
import Datomedico from "./Datomedico.js";
import Donadores  from './Donadores.js'
import Serviciorequerido from "./Serviciorequerido.js";
import Beneficiario from "./Beneficiario.js";
import Medios from "./Medios.js";

import Escolaridad from "./Escolaridad.js";
import Ocupacion from "./Ocupacion.js";

Paciente.belongsTo(Seguridadsocial,{foreignKey: 'seguridadsocialid'})
Paciente.belongsTo(Companyseguros,{foreignKey: 'companysegurosid'})
Paciente.belongsTo(Titularseguridadsocial,{foreignKey: 'titularseguridadsocialid'})
Paciente.belongsTo(Usuario,{foreignKey:'usuarioid'})
Paciente.belongsTo(Campaign,{foreignKey:'campaignid'})

Datomedico.belongsTo(Serviciorequerido,{foreignKey:'serviciorequeridoid'})


Paciente.belongsTo(Datomedico,{foreignKey:'datomedicoid'})
Paciente.belongsTo(Beneficiario,{foreignKey:'beneficiarioid'})
Paciente.belongsTo(Medios,{foreignKey:'mediosid'})





Beneficiario.belongsTo(Escolaridad,{foreignKey:'escolaridadid'})
Beneficiario.belongsTo(Ocupacion,{foreignKey:'ocupacionid'})


// Donadores.belongsTo()


export{
    Companyseguros,
    Paciente,
    Titularseguridadsocial,
    Seguridadsocial,
    Usuario,
    Campaign,
    Datomedico,
    Beneficiario,
    Donadores,
    Escolaridad,
    Serviciorequerido,
    Ocupacion
}