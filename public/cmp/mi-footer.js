customElements.define("mi-footer", class extends HTMLElement {
  connectedCallback() {
    this.innerText = "Copyright © 2019 Gilberto Pacheco Gallegos.";
  }
}, { extends: "footer" });