import { cod } from "./htmlUtil.js";

const lexer = moo.compile({
  ESPACIOS: {
    match: /\s+/,
    lineBreaks: true
  },
  COMENTARIO1: {
    match: /\/\/.*?$/,
    lineBreaks: true,
    value:
      /** @param {string} s */
      s =>/*html*/`<span class="comentario1">${cod(s)}</span>`
  },
  COMENTARIO2: {
    match: /<!--[\s\S]*?-->/,
    lineBreaks: true,
    value:
      /** @param {string} s */
      s =>/*html*/`<span class="comentario2">${cod(s)}</span>`
  },
  COMENTARIO3: {
    match: /\*[\s\S]*?\*\//,
    lineBreaks: true,
    value:
      /** @param {string} s */
      s =>/*html*/`<span class="comentario3">${cod(s)}</span>`
  },
  NÚMERO: {
    match: /0|[1-9][0-9]*/,
    lineBreaks: true,
    value: /** @param {string} s */
      s =>/*html*/`<span class="numero">${cod(s)}</span>`
  },
  STRING1: {
    match: /"(?:\\["\\]|[^\n"\\])*"/,
    lineBreaks: true,
    value: /** @param {string} s */
      s =>/*html*/`<span class="string1">${cod(s)}</span>`
  },
  STRING2: {
    match: /'(?:\\['\\]|[^\n'\\])*'/,
    lineBreaks: true,
    value: /** @param {string} s */
      s =>/*html*/`<span class="string2">${cod(s)}</span>`
  },
  ENTITY1: {
    match: /&[a-z]+;/,
    lineBreaks: true,
    value: /** @param {string} s */
      s =>/*html*/`<span class="entity1">${cod(s)}</span>`
  },
  ENTITY2: {
    match: /&#[0-9]{4};/,
    lineBreaks: true,
    value: /** @param {string} s */
      s =>/*html*/`<span class="entity2">${cod(s)}</span>`
  },
  ENTITY3: {
    match: /&#x?[0-9a-fA-F]+;/,
    lineBreaks: true,
    value: /** @param {string} s */
      s =>/*html*/`<span class="entity3">${cod(s)}</span>`
  },
  RESERVADA: {
    match: ['public', 'class', 'if', 'then', 'else', "elseif", "for", "html",
      "div", "span", "meta", "head", "body"],
    lineBreaks: true,
    value: /** @param {string} s */
      s =>/*html*/`<span class="reservada">${cod(s)}</span>`
  },
  IDENTIFICADOR: {
    match: /[a-zA-ZáéíóúñÁÉÍÓÚÑ_$][a-zA-Z0-9áéíóúñÁÉÍÓÚ+Ñ_$]*/,
    lineBreaks: true,
    value: /** @param {string} s */
      s =>/*html*/`<span class="identificador">${cod(s)}</span>`
  },
  TEXTO: {
    match: /.+?/,
    lineBreaks: true,
    value: /** @param {string} s */
      s =>/*html*/`<span class="texto">${cod(s)}</span>`
  }
});
/**
 * @param {string} s
 * @returns {string} */
export function embellece(s) {
  let resultado = "";
  let token = null;
  lexer.reset(s);
  do {
    token = lexer.next();
    if (token) {
      resultado += token.value;
    }
  } while (token);
  return resultado;
}