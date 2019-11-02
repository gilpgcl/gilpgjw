import { url, cod } from "../lib/htmlUtil.js";
document.head.innerHTML += /* html */
  `<style>
    mi-diapo {
      display: block;
    }
    mi-diapo img.ancha {
      display: block;
      height: 100%;
      margin-left: auto;
      margin-right: auto;
    }
    mi-diapo img.alta {
      display: block;
      width: 100%;
      margin-top: auto;
      margin-bottom: auto;
    }
    mi-diapo .diapo-nav .vista {
      z-index: 2;
    }
    mi-diapo .diapo-nav p {
      background-color: var(--color-fondo);
    }
  </style>`;
class MiDiapo extends HTMLElement {
  connectedCallback() {
    this.urlanterior = url(this.dataset.urlanterior);
    this.textoanterior = cod(this.dataset.textoanterior);
    this.urlmenu = url(this.dataset.urlmenu);
    this.textomenu = cod(this.dataset.textomenu);
    this.urlsiguiente = url(this.dataset.urlsiguiente);
    this.textosiguiente = cod(this.dataset.textosiguiente);
    this.innerHTML = /* html */
      `<div class="vista">
        <img>
      </div>
      <div class="diapo-nav" hidden>
        <div class="vista">
          <header>
            <div class="herramientas">
              <button data-click="cierra">
                <i class="material-icons">close</i>
              </button>
            </div>
            <h1>${this.dataset.titulo}</h1>
          </header>
          <nav class="principal">`
      + (this.urlanterior ? /*html*/
        `   <p>
              <a href="${url(this.dataset.urlanterior)}"><i
                class="material-icons">navigate_before</i>${
        cod(this.dataset.textoanterior)}</a>
            </p>`: "")
      + (this.urlmenu ? /*html*/
        `   <p>
              <a href="${url(this.dataset.urlmenu)}">${
        cod(this.dataset.textomenu)}</a>
            </p>`: "")
      + (this.urlsiguiente ? /*html*/
        `   <p>
              <a href="${url(this.dataset.urlsiguiente)}">${
        cod(this.dataset.textosiguiente)}<i
                class="material-icons">navigate_next</i></a>
            </p>`: "")
      + /*html*/
      `   </nav>
        </div>
      </div>`;
    const fragmento = location.hash.trim().replace(/^\#/, "");
    this.actual = fragmento ? parseInt(fragmento, 10) : 1;
    this.img = this.querySelector("img");
    this.nav = this.querySelector("nav");
    if (this.nav) {
      this.addEventListener("click", () => this.nav.hidden = false);
    }
    window.addEventListener("resize", this.resize.bind(this));
    this.muestra();
    this.resize();
    document.addEventListener("keydown", evt => {
      switch (evt.key) {
        case "ArrowLeft":
          this.retrocede();
          break;
        case "ArrowRight":
          this.avanza();
          break;
        case "x":
          this.siguiente();
      }
    });
    document.body.addEventListener("keyup", evt => {
      switch (evt.key) {
        case "Escape":
          this.siguiente();
      }
    });
    document.addEventListener("swipeizquierdo", this.avanza.bind(this));
    document.addEventListener("swipederecho", this.retrocede.bind(this));
    document.addEventListener("swipearriba", this.siguiente.bind(this));
  }
  /** @todo Mejorar el algoritmo. */
  resize() {
    if (document.documentElement.clientHeight
      >= document.documentElement.clientWidth) {
      this.img.classList.add("alta");
      this.img.classList.remove("ancha");
    } else {
      this.img.classList.add("ancha");
      this.img.classList.remove("alta");
    }
  }
  avanza() {
    if (this.actual < parseInt(this.dataset.total, 10)) {
      ++this.actual;
      this.muestra();
    }
  }
  retrocede() {
    if (this.actual > 1) {
      --this.actual;
      this.muestra();
    }
  }
  muestra() {
    this.img.src = (this.dataset.url + this.actual) + ".jpg";
    location.hash = "#" + this.actual;
  }
  siguiente() {
    if (this.dataset.urlsiguiente) {
      location.href = encodeURI(this.dataset.urlsiguiente);
    }
  }
}
customElements.define("mi-diapo", MiDiapo);