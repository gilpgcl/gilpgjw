import { MiFooter as _ } from "./mi-footer.js";
import { cod } from "../lib/htmlUtil.js";
import { catchas, validaResponse } from "../lib/util.js";

/** Nodo del descriptor de proyecto.
 * @typedef {Object} Nodo
 * @property {string} nombre
 * @property {string=} tipo
 * @property {number=} orden
 * @property {string=} url
 * @property {Nodo[]=} archivos */

/** Descriptor de archivo.
* @typedef {Object} Archivo
* @property {string} nombre
* @property {string=} tipo
* @property {string} url*/

customElements.define("mi-proyecto", class extends HTMLElement {
  connectedCallback() {
    const urlmenu =
      this.dataset.urlmenu ? encodeURI(this.dataset.urlmenu) : "";
    const textomenu = cod(this.dataset.textomenu);
    this.classList.add("vista");
    this.innerHTML = /* html */
      `<header>
        <div class="herramientas">
          <a href="menu.html">
            <i class="material-icons">menu</i>
          </a>
        </div>
        <h1><output><progress max="100">Cargando…</progress></output></h1>
      </header>
      <div class="principal">
        <main></main>
        <aside>
          <h2>Enlaces</h2>
          <nav>
            <p class="anterior">
              <a><i class="material-icons">navigate_before</i><span></span></a>
            </p>`
      + (urlmenu ? /*html*/
        `<p><a href="${urlmenu}">${textomenu}</a></p>` : "")
      +  /*html*/
      ` <p class="siguiente">
              <a><span></span><i class="material-icons">navigate_next</i></a>
            </p>
          </nav>
        </aside>
        <footer is="mi-footer"></footer>
      </div>`;
    const fragmento = location.hash.trim().replace(/^\#/, "");
    this.actual = fragmento ? parseInt(fragmento, 10) : -1;
    this.urlanterior =
      this.dataset.urlanterior ? encodeURI(this.dataset.urlanterior) : "";
    this.textoanterior = this.dataset.textoanterior || "";
    this.urlsiguiente =
      this.dataset.urlsiguiente ? encodeURI(this.dataset.urlsiguiente) : "";
    this.textosiguiente = this.dataset.textosiguiente || "";
    this.url = this.dataset.url || "";
    this.título = this.querySelector("output");
    this.main = this.querySelector("main");
    /** @type {HTMLParagraphElement} */
    this.anterior = this.querySelector(".anterior");
    /** @type {HTMLParagraphElement} */
    this.siguiente = this.querySelector(".siguiente");
    addEventListener("hashchange", () => {
      const fragmento = location.hash.trim().replace(/^\#/, "");
      this.actual = fragmento ? parseInt(fragmento, 10) : -1;
      this.muestra();
    });
    this.cargaProyecto();
  }
  cargaProyecto() {
    catchas(async () => {
      const respuesta = await fetch(this.url);
      validaResponse(respuesta);
      this.orden = 0;
      /** @type {Archivo[]} */
      this.archivos = [];
      /** @type {Nodo} */
      this.raíz = await respuesta.json();
      this.analiza(this.raíz, this.raíz.url, "");
      this.muestra();
    });
  }
  /**
   * @param {Nodo} nodo
   * @param {string} url
   * @param {string} ruta */
  analiza(nodo, url, ruta) {
    if (nodo.archivos) {
      const nuevaUrl = url + "/" + nodo.nombre;
      const nuevaRuta = ruta + "/" + nodo.nombre;
      for (const archivo of nodo.archivos) {
        this.analiza(archivo, nuevaUrl, nuevaRuta);
      }
    } else {
      nodo.orden = this.orden++;
      this.archivos.push({
        nombre: nodo.nombre,
        tipo: nodo.tipo,
        url: encodeURI(url + "/" + nodo.nombre)
      });
    }
  }
  avanza() {
    if (this.actual < this.archivos.length - 1) {
      ++this.actual;
      this.muestra();
    }
  }
  retrocede() {
    if (this.actual > -1) {
      --this.actual;
      this.muestra();
    }
  }
  muestra() {
    if (this.actual === -1) {
      this.muestraPortada();
      location.hash = "#" + this.actual;
    } else {
      location.hash = "#" + this.actual;
      this.muestraArchivo();
    }
    this.muestraAnterior();
    this.muestraSiguiente();
  }
  muestraArchivo() {
    const archivo = this.archivos[this.actual];
    document.title = archivo.nombre + " - " + this.dataset.titulo;
    this.título.value = archivo.nombre;
    this.main.innerHTML = /* html */
      `<progress max="100">Cargando…</progress>`;
    catchas(async () => {
      const respuesta = await fetch(archivo.url);
      validaResponse(respuesta);
      const texto = await respuesta.text();
      while (this.main.firstChild) {
        this.main.removeChild(this.main.firstChild);
      }
      const pre = this.main.appendChild(document.createElement("pre"));
      const code = pre.appendChild(document.createElement("code"));
      code.className = "language-" + archivo.tipo;
      code.textContent = texto;
      // @ts-ignore
      Prism.highlightAll();
    });
  }
  muestraPortada() {
    document.title = this.dataset.titulo;
    this.título.value = this.dataset.titulo;
    this.main.innerHTML =
      "<ul>" + this.creaNodo(this.raíz, this.raíz.url) + "<ul>";
  }
  /**
   * @param {Nodo} nodo
   * @param {string} ruta
   * @returns {string} */
  creaNodo(nodo, ruta) {
    if (nodo.archivos) {
      const nuevaRuta = ruta + "/" + nodo.nombre;
      let resultado = "<li><p>" + nodo.nombre + "</p><ul>";
      for (const archivo of nodo.archivos) {
        resultado += this.creaNodo(archivo, nuevaRuta);
      }
      resultado += "</ul></li>";
      return resultado;
    } else {
      const resultado = /* html */
        `<li><p><a href="#${nodo.orden}">${nodo.nombre}</a></p></li>`;
      return resultado;
    }
  }
  muestraAnterior() {
    let a = this.anterior.querySelector("a");
    let span = this.anterior.querySelector("span");
    if (this.actual === -1) {
      if (this.urlanterior) {
        this.anterior.hidden = false;
        a.href = this.urlanterior;
        span.innerText = this.textoanterior;
      } else {
        this.anterior.hidden = true;
      }
    } else if (this.actual === 0) {
      this.anterior.hidden = false;
      a.href = "#-1";
      span.innerText = this.dataset.titulo;
    } else {
      this.anterior.hidden = false;
      a.href = "#" + (this.actual - 1);
      span.innerText = this.archivos[this.actual - 1].nombre;
    }
  }
  muestraSiguiente() {
    let a = this.siguiente.querySelector("a");
    let span = this.siguiente.querySelector("span");
    if (this.actual === this.archivos.length - 1) {
      if (this.urlsiguiente) {
        this.siguiente.hidden = false;
        a.href = this.urlsiguiente;
        span.innerText = this.textosiguiente;
      } else {
        this.siguiente.hidden = true;
      }
    } else if (this.actual < this.archivos.length - 1) {
      this.siguiente.hidden = false;
      a.href = "#" + (this.actual + 1);
      span.innerText = this.archivos[this.actual + 1].nombre;
    }
  }
});