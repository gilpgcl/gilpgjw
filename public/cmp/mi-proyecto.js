import { DiapoNav } from "./diapo-nav.js";
import { url, cod } from "../lib/htmlUtil.js";

document.head.innerHTML +=/*html*/
  `<style>
    [is=mi-diapo] {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  </style>`;
customElements.define("mi-proyecto", class extends HTMLImageElement {
  connectedCallback() {
    const urlmenu =
      this.dataset.urlmenu ? encodeURI(this.dataset.urlmenu) : "";
    const textomenu = cod(this.dataset.textomenu);
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
        <p class="anterior">
          <a><i class="material-icons">navigate_before</i><span></span></a>
        </p>`
      + (urlmenu ? /*html*/
        `<p><a href="${urlmenu}">${textomenu}</a></p>` : "")
      +  /*html*/
      ` <p class="anterior">
          <a><i class="material-icons">navigate_next</i><span></span></a>
        </p>
      </div>`;
    const fragmento = location.hash.trim().replace(/^\#/, "");
    this.actual = fragmento ? parseInt(fragmento, 10) : 1;
    this.urlanterior =
      this.dataset.urlanterior ? encodeURI(this.dataset.urlanterior) : "";
    this.textoanterior = cod(this.dataset.textoanterior);
    this.urlsiguiente =
      this.dataset.urlsiguiente ? encodeURI(this.dataset.urlsiguiente) : "";
    this.textosiguiente = cod(this.dataset.textosiguiente);
  }
});