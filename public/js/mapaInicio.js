/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function(){\r\n    const lat = 19.4153897;\r\n    const lng = -99.1649381;\r\n    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);\r\n    \r\n    let markers = new L.FeatureGroup().addTo(mapa)\r\n\r\n    let pacientes=[];\r\n\r\n    //Filtros\r\n     const filtros = {\r\n        campaign:''\r\n     }\r\n     \r\n     const campaignsSelect= document.querySelector('#campaign');\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n    \r\n\r\n    //Filtrado de campañas\r\n    campaignsSelect.addEventListener('change', e => {\r\n        filtros.campaign = +e.target.value\r\n        filtraPacientes()\r\n    })\r\n\r\n    const obtenerPacientes =async () =>{\r\n        try{\r\n            const url = '/api/pacientes'\r\n            const respuesta = await fetch(url)\r\n             pacientes = await respuesta.json()\r\n\r\n            mostrarPacientes(pacientes)\r\n\r\n        }catch(error){\r\n            console.log(error)\r\n        }\r\n    }\r\n\r\n    const mostrarPacientes = pacientes => {\r\n        // Limpiar los markers previos\r\n        markers.clearLayers()\r\n    \r\n        pacientes.forEach(paciente => {\r\n            if (paciente.publicado) { // Verificar si el paciente está publicado\r\n                // Agregar los pines solo si el paciente está publicado\r\n                const marker = new L.marker([paciente?.lat, paciente?.lng], {\r\n                        autoPan: true\r\n                    })\r\n                    .addTo(mapa)\r\n                    .bindPopup(`\r\n                        <h1 class=\"text-xl font-extrabold uppercase my-5 m-5\">${paciente?.nombre}</h1>\r\n                        <img src=\"/uploads/${paciente?.imagen}\" alt=\"Imagen del paciente ${paciente.nombre}\">\r\n                        <p class=\"text-gray-600 font-bold\"> </p> \r\n                        <a href=\"/pacientes/${paciente.id}\" style=\"color: white; \" class=\"bg-indigo-600 block p-2 text-center font-bold uppercase\">Ver Paciente</a>\r\n                    `)\r\n    \r\n                markers.addLayer(marker)\r\n            }\r\n        })\r\n    }\r\n    \r\n\r\n    const filtraPacientes =()=>{\r\n        const resultado =pacientes.filter(filtrarCampaign)\r\n        mostrarPacientes(resultado)\r\n\r\n    }\r\n\r\n    const filtrarCampaign =paciente=> filtros.campaign ? paciente. campaignid == filtros.campaign :paciente\r\n    \r\n\r\n    obtenerPacientes()\r\n\r\n})()\n\n//# sourceURL=webpack://bienesraices/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;