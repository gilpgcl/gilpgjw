import { cod, url, valida } from "../lib/util.js";

document.head.innerHTML +=/*html*/
  `<style>
    [is=diapo-nav] {
      z-index: 2;
    }
    [is=diapo-nav] p {
      background-color: var(--color-fondo);
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
    this.classList.add("vista");
    this.innerHTML = /* html */
      `<header>
        <div class="herramientas">
          <button data-click="cerrar">
            <i class="material-icons">close</i>
          </button>
        </div>
        <h1>${this.dataset.titulo}</h1>
      </header>
      <div class="principal">
        <p>
          <a href="${url(this.dataset.urlanterior)}"><i
            class="material-icons">navigate_before</i>${
      cod(this.dataset.textoanterior)}</a>
        </p>
        <p>
          <a href="${url(this.dataset.urlmenu)}">${
      cod(this.dataset.textomenu)}</a>
        </p>
        <p>
          <a href="${url(this.dataset.urlsiguiente)}">${
      cod(this.dataset.textosiguiente)}<i
            class="material-icons">navigate_next</i></a>
        </p>
      </div>`;
    this.querySelector("button")
      .addEventListener("click", () => this.hidden = true);
  }
}

customElements.define("diapo-nav", DiapoNav, { extends: "nav" });