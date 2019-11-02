import { sinScript } from "./htmlUtil.js";
import { getURLSearchParam, preparaParaBúsqueda } from "./util.js";

/** Enlaza cada element del padre con el método que se llama igual que su
 * atributo data-submit, data-click, data-input o data-seleccion, según el
 * evento que se desea escuchar. Se pasa el descriptor de evento como parámetro.
 * @param {HTMLElement} padre element con el que se enlazan las acciones.
 * @param {Object} obj objeto con el que se enlazan las acciones. */
export function enlazaAcciones(padre, obj) {
  for (const evento of ["submit", "click", "input", "change"]) {
    enlazaAcción(padre, evento, obj);
  }
  for (const evento of ["submit", "click", "input", "change"]) {
    for (const element
      of Array.from(padre.querySelectorAll(`[data-${evento}]`))) {
      if (element instanceof HTMLElement) {
        enlazaAcción(element, evento, obj);
      }
    }
  }
}

/**
 * @param {HTMLElement} element
 * @param {string} evento
 * @param {Object} obj */
function enlazaAcción(element, evento, obj) {
  if (element.dataset[evento]) {
    const accion = element.dataset[evento];
    if (typeof obj[accion] === "function") {
      element.addEventListener(evento, evt => obj[accion].call(obj, evt));
    }
  }
}
/** Analiza el element padre y por cada element con el atributo data-enlaza y la
 * propiedad value que no sea un output, toma su value y lo pasa al modelo
 * con el valor de data-enlaza.
 * @param {HTMLElement} padre element para la búsqueda.
 * @returns {Object} el modelo leido. */
export function leeModelo(padre) {
  const modelo = {};
  for (const element of Array.from(padre.querySelectorAll("[data-enlaza]"))) {
    if (element instanceof HTMLElement
      && !(element instanceof HTMLOutputElement)
      && !(element instanceof HTMLImageElement)) {
      const bind = element.dataset.bind;
      if (element instanceof HTMLInputElement && element.type === "number") {
        modelo[bind] = (element.valueAsNumber || null);
      } else if (element instanceof HTMLInputElement
        && element.type === "checkbox") {
        modelo[bind] = element.checked
      } else {
        /** @type {string} */
        let valor = element["value"];
        if (element.dataset.trim) {
          valor = valor.trim();
        }
        if (element.dataset.sinscript) {
          valor = sinScript(valor);
        }
        modelo[bind] = valor;
        if (element.dataset.busqueda) {
          modelo[element.dataset.busqueda] = preparaParaBúsqueda(valor);
        }
      }
    }
  }
  return modelo;
}

/** Muestra las property de un modelo en el element padre; para ello, identifica
 * los los element con el atributo data-enlaza y usa el valor de este último para
 * identificar el nombre de la property en el modelo.
 * @param {HTMLElement} padre element para la búsqueda.
 * @param {Object} modelo */
export function muestraModelo(padre, modelo) {
  if (padre) {
    for (const element of Array.from(padre.querySelectorAll("[data-enlaza]"))) {
      if (element instanceof HTMLElement) {
        const enlaza = element.dataset.enlaza;
        muestraElement(element, modelo[enlaza]);
      }
    }
  }
}

/** Muestra los urlSearchParams en el element padre; para ello, identifica
 * los los element con el atributo data-param y usa el valor de este último para
 * identificar el nombre del urlSearchParams.
 * @param {HTMLElement} padre element para la búsqueda. */
export function muestraURLSearchParams(padre) {
  for (const element of padre.querySelectorAll("[data-param]")) {
    if (element instanceof HTMLElement) {
      const param = element.dataset.param;
      muestraElement(element, getURLSearchParam(param));
    }
  }
}

/**
 * Muestra un element.
 * @param {HTMLElement} element element que se muestra.
 * @param {*} valor */
function muestraElement(element, valor) {
  const valorOk = valor || element.dataset.default;
  if (element instanceof HTMLDivElement) {
    valor = valorOk;
    if (element.dataset.sinscript) {
      valor = sinScript(valor);
    }
    element.innerHTML = valor;
  } else if (element instanceof HTMLPreElement) {
    element.textContent = valorOk;
  } else if (element instanceof HTMLImageElement) {
    element.src = valorOk;
    element.dataset.default = element.src;
  } else if (element instanceof HTMLAnchorElement) {
    valor = valorOk;
    element.href = encodeURI(valor);
    element.textContent = valor;
  } else if (element instanceof HTMLInputElement
    && element.type === "number") {
    element.value = valorOk;
  } else if (element instanceof HTMLInputElement
    && element.type === "checkbox") {
    element.checked = Boolean(valor);
  } else {
    valor = valorOk;
    if (element.dataset.sinscript) {
      valor = sinScript(valor);
    }
    element["value"] = valor;
  }
}
/** Muestra el título de una página a partir del orden indicado en los element
 * con el atributo data-titulo. Toma el value de los atributos y separa los
 * valores con el atributo data-separador.
 * @param {HTMLElement} padre element para la búsqueda.
 * @param {string} selector selector del element que muestra el título. */
export function muestraTítulo(padre, selector) {
  /** @type {HTMLElement} */
  const elemTítulo = padre.querySelector(selector);
  if (elemTítulo) {
    const título =
      Array.from(padre.querySelectorAll("[data-titulo]"))
        .map(element => {
          if (element instanceof HTMLElement) {
            return {
              número: parseInt(element.dataset.titulo || "1", 10),
              texto: element["value"] || "",
              separador: element.dataset.separador || ""
            };
          } else {
            return { número: 1, texto: "", separador: "" };
          }
        })
        .sort((tit1, tit2) => tit1.número - tit2.número)
        .reduce((prev, act) => prev + act.texto + act.separador, "");
    elemTítulo.innerText = título;
  }
}