import { cod, url, valida } from "../lib/util.js";

document.head.innerHTML +=/*html*/
  `<style>
  [is=diapo-nav] {
    color: var(--color-letra);
    background-color: var(--color-fondo);
    position: absolute;
    z-index: 2;
  }
</style>`;
export class DiapoNav extends HTMLElement {
  /** Busca un una instancia de esta clase.
   * @param {HTMLElement|Document} padre raíz de la búsqueda.
   * @param {string} selector selector en HTML.
   * @returns {DiapoNav} el element encontrado o null.
   * @throws {TypeError} si el id no corresponde a una instancia de esta clase.
   */
  static get(padre, selector) {
    const element = padre.querySelector(selector);
    if (element) {
      valida(element instanceof DiapoNav, `${selector} no es diapo-nav.`,
        TypeError);
    }
    // @ts-ignore
    return element;
  }
  connectedCallback() {
    this.hidden = true;
    this.innerHTML = /* html */
      `<h1>${this.dataset.titulo}</h1>
      <p><button onclick="this.parentNode.parentNode.hidden=true">Cerrar</button><p>
      <p>
        <a href="${url(this.dataset.urlanterior)}"><i
          class="material-icons">navigate_before</i>${cod(this.dataset.textoanterior)}</a>
      </p>
      <p>
        <a href="${url(this.dataset.urlmenu)}">${cod(this.dataset.textomenu)}</a>
      </p>
      <p>
        <a href="${url(this.dataset.urlsiguiente)}">${cod(this.dataset.textosiguiente)}<i
          class="material-icons">navigate_next</i></a>
      </p>`;
  }
}

customElements.define("diapo-nav", DiapoNav, { extends: "nav" });