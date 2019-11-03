export class MiFooter extends HTMLElement {
  connectedCallback() {
    this.innerText = "Copyright © 2019 Gilberto Pacheco Gallegos.";
  }
}
customElements.define("mi-footer", MiFooter, { extends: "footer" });