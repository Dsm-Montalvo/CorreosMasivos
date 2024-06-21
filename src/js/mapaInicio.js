(function(){
    const lat = 19.4153897;
    const lng = -99.1649381;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);
    
    let markers = new L.FeatureGroup().addTo(mapa)

    let pacientes=[];

    //Filtros
     const filtros = {
        campaign:''
     }
     
     const campaignsSelect= document.querySelector('#campaign');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
    

    //Filtrado de campañas
    campaignsSelect.addEventListener('change', e => {
        filtros.campaign = +e.target.value
        filtraPacientes()
    })

    const obtenerPacientes =async () =>{
        try{
            const url = '/api/pacientes'
            const respuesta = await fetch(url)
             pacientes = await respuesta.json()

            mostrarPacientes(pacientes)

        }catch(error){
            console.log(error)
        }
    }

    const mostrarPacientes = pacientes => {
        // Limpiar los markers previos
        markers.clearLayers()
    
        pacientes.forEach(paciente => {
            if (paciente.publicado) { // Verificar si el paciente está publicado
                // Agregar los pines solo si el paciente está publicado
                const marker = new L.marker([paciente?.lat, paciente?.lng], {
                        autoPan: true
                    })
                    .addTo(mapa)
                    .bindPopup(`
                        <h1 class="text-xl font-extrabold uppercase my-5 m-5">${paciente?.nombre}</h1>
                        <img src="/uploads/${paciente?.imagen}" alt="Imagen del paciente ${paciente.nombre}">
                        <p class="text-gray-600 font-bold"> </p> 
                        <a href="/pacientes/${paciente.id}" style="color: white; " class="bg-indigo-600 block p-2 text-center font-bold uppercase">Ver Paciente</a>
                    `)
    
                markers.addLayer(marker)
            }
        })
    }
    

    const filtraPacientes =()=>{
        const resultado =pacientes.filter(filtrarCampaign)
        mostrarPacientes(resultado)

    }

    const filtrarCampaign =paciente=> filtros.campaign ? paciente. campaignid == filtros.campaign :paciente
    

    obtenerPacientes()

})()