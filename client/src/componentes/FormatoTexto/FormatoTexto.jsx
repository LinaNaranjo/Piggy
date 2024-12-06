import React from 'react'
/**
 * Formatea un texto para que la primera letra sea mayúscula 
 * y el resto en minúsculas.
 * @param {string} text - Texto a formatear.
 * @returns {string} Texto formateado.
 */

const FormatoTexto = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
export default FormatoTexto