import { DiapoNav } from "./diapo-nav.js";

document.head.innerHTML +=/*html*/
  `<style>
    [is=mi-diapo] {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  </style>`;
customElements.define("mi-diapo", class extends HTMLImageElement {
  connectedCallback() {
    const fragmento = location.hash.trim().replace(/^\#/, "");
    let actual = fragmento ? parseInt(fragmento, 10) : 1;
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

    /**
     * @param {HTMLImageElement} obj */
    function avanza(obj) {
      if (actual < parseInt(obj.dataset.total, 10)) {
        ++actual;
        muestra(obj);
      }
    }
    /**
     * @param {HTMLImageElement} obj */
    function retrocede(obj) {
      if (actual > 1) {
        --actual;
        muestra(obj);
      }
    }
    /**
     * @param {HTMLImageElement} obj */
    function muestra(obj) {
      obj.src = (obj.dataset.url + actual) + ".jpg";
      location.hash = "#" + actual;
    }
    /**
     * @param {HTMLImageElement} obj */
    function siguiente(obj) {
      if (obj.dataset.antes) {
        location.href = encodeURI(obj.dataset.siguiente);
      }
    }
  }
});