import { MiNav } from "./mi-nav.js";
import { cod } from "../lib/htmlUtil.js";

customElements.define("header-titulo", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/
      `<nav is="mi-nav"></nav><h1>${cod(this.dataset.titulo)}</h1>`;
  }
}, { extends: "header" });