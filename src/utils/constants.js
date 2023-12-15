// Recuperar datos almacenados en localStorage al cargar la página
const API_BASE_URL = localStorage.getItem("API_BASE_URL") || "http://192.168.56.1:8090";
var DATA_ = JSON.parse(localStorage.getItem("DATA_")) || [];
var THEME = localStorage.getItem("THEME") || "claro";
var LETTERSIZE = parseInt(localStorage.getItem("LETTERSIZE")) || 20;
var JWTTOKEN = localStorage.getItem("JWTTOKEN") || "";
var ROL = localStorage.getItem("ROL") || "";


export {
    API_BASE_URL,
    DATA_,
    THEME,
    LETTERSIZE,
    actualizarAlmacenamientoLocal,
    limpiarDatosLocales,
    actualizarTema,
    JWTTOKEN,
    ROL
}

// Función para actualizar el almacenamiento local cuando cambian los datos
function actualizarAlmacenamientoLocal() {
    localStorage.setItem("API_BASE_URL", API_BASE_URL);
    localStorage.setItem("DATA_", JSON.stringify(DATA_));
    localStorage.setItem("THEME", THEME);
    localStorage.setItem("LETTERSIZE", LETTERSIZE.toString());
    localStorage.setItem("JWTTOKEN", JWTTOKEN);
    localStorage.setItem("ROL", ROL);
}

// Función para limpiar el array DATA_ en localStorage
function limpiarDatosLocales() {
    localStorage.removeItem("DATA_");
    // También podrías reiniciar el array en memoria
    DATA_ = [];
}

function actualizarTema(nuevoTema) {
    THEME = nuevoTema;
    localStorage.setItem("THEME", nuevoTema);
}
