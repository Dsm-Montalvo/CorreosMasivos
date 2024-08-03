import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const HistorialMensajes = db.define('HistorialMensajes', {
  nombreMensaje: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asunto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alias: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fechaEnvio: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  timestamps: false,
  tableName: 'historial_mensajes',
});

export default HistorialMensajes;