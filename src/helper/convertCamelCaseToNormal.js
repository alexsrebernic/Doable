export default function convertCamelCaseToNormal(texto) {
    // Separa las palabras utilizando expresiones regulares
    let palabrasSeparadas = texto.replace(/([a-z])([A-Z])/g, '$1 $2');
  
    // Convierte todas las letras en minúsculas
    palabrasSeparadas = palabrasSeparadas.toLowerCase();
  
    // Retorna el texto convertido
    return palabrasSeparadas;
  }
  
  