/** Funciones para html.
 *  @module */

/** Elimina todas las etiquetas que abren o cierran los element script, de un
 * texto HTML.
 * @param {string} html texto HTML.
 * @returns {string} texto HTML sin las etiquetas que abren o cierran los
 * element script */
export function sinScript(html) {
  // Reemplaza todas las ocurrencias de <script> y </script> por texto vacío.
  return (html || "").replace(/(\<script\>)|(\<\/script\>)/g, "");
}

/** Codifica un texto para que escape los caracteres especiales para que no se
 * pueda interpretar como HTML.
 * @param {*} texto
 * @returns {string} un texto que no puede interpretarse como HTML. */
export function cod(texto) {
  let div = document.createElement('div');
  div.innerText = (texto || "").toString();
  return div.innerHTML;
}

/** codifica una url para que se interprede correctamente en un element a.
 * @param {string} url url que se codifica.
 * @returns {string} la url codificada. */
export function url(url) {
  return cod(encodeURIComponent(url));
}
/** Indica si un input type="file" tiene un archivo seleccionado.
 * @param {HTMLInputElement} file input que se analiza.
 * @returns {File} devuelve el archivo seleccionado; en otro caso, false. */
export function fileSeleccionado(file) {
  return file.files && file.files[0];
}