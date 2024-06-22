import { exit } from 'node:process';


import db from '../config/db.js';

const importarDatos = async () => {
  try {
    // Autenticar
    await db.authenticate();

    // Generar las columnas
    await db.sync();

   

    console.log('Datos importados correctamente');
    exit();
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    // Eliminar los datos de todas las tablas
    await db.sync({ force: true });
    console.log('Datos eliminados correctamente');
    exit();
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

if (process.argv[2] === '-i') {
  importarDatos();
}

if (process.argv[2] === '-e') {
  eliminarDatos();
}