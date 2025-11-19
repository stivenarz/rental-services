


/**
 * Función que recorta la cantidad de letras solicitadas de cada una de las palabras en un string y las devuelve pegadas.
 * @param {string} str texto al que se le aplicará el acortamiento
 * @param {number} letterCount numero de letras resultantes
 * @returns {string}
 */
export function nameShortener(str, letterCount) {
  return str.split(' ').map(w => w[0]).join('').slice(0,letterCount);
}
