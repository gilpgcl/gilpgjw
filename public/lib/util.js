/** Funciones utilizadas en todo el proyecto.
 *  @module */

export const urlSearchParams = new URLSearchParams(location.search);

/** devuelve el valor de un parámetro de la página.
 * @param {?string} name nombre del parámetro que se busca.
 * @returns {?string} valor del parámetro, o null si no lo encuentra. */
export function getURLSearchParam(name) {
  return name ? urlSearchParams.get(name) : null;
}

/** Muestra una instancia de Error en la consola y muestra un diálogo
 * alert con la propiedad message del objeto.
 * @param {Error} e instancia que contiene el error. */
export function error(e) {
  console.error(e);
  alert(e.message);
}

/** Asegura que una condición se cumpla, o en caso contrario lanza un Error. * 
 * @param {*} condición expresión cuyo valor boolean debe ser true.
 * @param {*} mensaje mensaje para el Error que se lanza cuando la condición no
 * @throws {Error} si la condición no se cumple */
export function valida(condición, mensaje) {
  if (!condición) {
    throw new Error(mensaje);
  }
}

/** Quita los espacios al inicio y al final. Sustituye cualquier secuencia de
 * espacios y saltos de línea por un solo espacio.
 * @param {string=} texto el texto a procesar.
 * @returns {string} el texto procesado*/
export function colapsaEspacios(texto) {
  return (texto || "").trim().replace(/\s+/g, " ");
}

/** Prepara un téxto para los algoritmos de búsqueda: Colapsa espacios,
 * convierte el texto a mayúsculas y finalmente, quita los acentos y tildes.
 * @param {string} texto el texto procesado. */
export function preparaParaBúsqueda(texto) {
  return colapsaEspacios(texto).toUpperCase()
    .replace(/(á|Á|é|É|í|Í|ó|Ó|ú|Ú|ñ|Ñ)/g,
      /** Sustituye un caracter acentuado por su versión no acentuada y
       * mayúscula.
       * @param {string} letra texto a reemplazar.
       * @returns {string} el texto reemplazado. */
      letra => {
        switch (letra) {
          case "á":
          case "Á": return "A";
          case "é":
          case "É": return "E";
          case "í":
          case "Í": return "I";
          case "ó":
          case "Ó": return "O";
          case "ú":
          case "Ú": return "U";
          case "ñ":
          case "Ñ": return "N";
          default: return letra;
        }
      });
}

/** Ejecuta una función y atrapa el Error que se llegue a generar, en cuyo caso,
 * ejecuta la función error y cambia a la url, en caso de que se indique.
 * @param {() => void} fun función a ejecutar. */
export function catche(fun) {
  try {
    fun();
  } catch (e) {
    // En caso de error.
    error(e)
  }
}

/** Recibe una Promise o una function que devuelve una Promise, las procesa y
 * en caso de error, ejecuta la función error y cambia a la url, en caso de que
 * se indique. Devuelve todo esto en forma de Promise. Como es async, la sección
 * de código que invoque esta función, no se espera a que termine, a menos que
 * use el operador await.
 * @param {(()=>Promise)|Promise} prom función a una Promise o promise a
 * ejecutar. 
 * @returns {Promise<void>} una Promise que refleja el procesamiento de esta
 * función. */
export async function catchas(prom) {
  try {
    // Espera a que termine la Promise resultante.
    await (prom instanceof Function ? prom() : prom);
  } catch (e) {
    // En caso de error.
    error(e)
  }
  // Devuelve una Promise<void>.
}

/** Verifica que una referencia apunte a un objeto y que este no sea NaN, Si
 * alguna de las 2 condiciones no se cumple, lanza un TypeError.
 * @param {*} referencia la referrencia que se verifica.
 * @param {string=} mensaje message del TypError si no se aprueba la validación.
 * @returns {!*} la misma referencia, pero con seguridad apunta a un objeto que
 * no es NaN.
 * @throws Type error si la referenca vale null, undefined o apunta a un NaN. */
export function exige(referencia, mensaje) {
  if (referencia === null || referencia === undefined
    || (typeof referencia === "number" && isNaN(referencia))) {
    throw new TypeError(mensaje);
  }
  return referencia;
}

/**
 * @param {Response} resp  */
export function validaResponse(resp) {
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }
}