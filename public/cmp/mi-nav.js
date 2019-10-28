export class MiNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/
      `<a href="menu.html">
      <i class="material-icons">menu</i>
    </a>`;
  }
}

customElements.define("mi-nav", MiNav, { extends: "nav" });