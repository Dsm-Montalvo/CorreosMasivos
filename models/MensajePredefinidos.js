import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const MensajesPredefinidos = db.define('MensajesPredefinidos', {
  alias: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  asunto: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

export default MensajesPredefinidos;