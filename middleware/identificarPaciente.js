import Paciente  from "../models/Paciente.js";


const identificarPaciente = async (req, res, next) => {
    try {
      const paciente = await Paciente.findByPk(req.params.pacienteId);
      if (!paciente) {
        return res.status(404).send('Paciente no encontrado');
      }
      req.paciente = paciente;
      next();
    } catch (error) {
      next(error);
    }
  };
  
export default identificarPaciente
  