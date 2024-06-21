document.addEventListener('DOMContentLoaded', function() {
    const fechaNacimientoInput = document.getElementById('fechanacimiento');
    const edadInput = document.getElementById('edad');
    const mesesInput = document.getElementById('meses');
  
    fechaNacimientoInput.addEventListener('change', function() {
      const fechaNacimiento = new Date(fechaNacimientoInput.value);
      const hoy = new Date();
      
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
  
      const meses = mes < 0 ? (12 + mes) : mes;
  
      edadInput.value = edad;
      mesesInput.value = meses;
    });
  });
  