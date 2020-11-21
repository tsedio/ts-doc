"use strict";

const {context} = require("../context");
const KEYWORDS = /(\benum\b|\bstatic\b|\bclass\b|\binterface\b|\bprivate\b|\bpublic\b|\bconst\b|\blet\b|\bprotected\b|\bimplements\b|\bconstructor\b|\breadonly\b|\babstract\b|\bimport\b|\bexport\b|\bas\b|\bfrom\b|\bextends\b)/g;
const TYPES = /(\bany\b|\bstring\b|\bboolean\b|\bnumber\b|\bDate\b|\bvoid\b)/g;
const SEPARATOR = /(:|;|,|\(|\)|{|}|\[|\]| = )/g;

const replacement = (match, $1, index, content, ctx = context) => {
  if (ctx.symbols.has($1)) {
    const symbol = context.symbols.get($1);

    $1 = $1.replace(/</gi, "&lt;").replace(/>/gi, "&gt;");

    return `<a href="${symbol.url}"><span class="token">${$1}</span></a>`;
  }

  return match;
};

const symbolsMatch = (current, ctx = context) => {
  const keys = [];

  ctx.symbols.forEach((o) => {
    if (current !== o.symbolName && o.symbolType !== "function" && o.symbolName !== "") {
      keys.push(o.symbolName.replace(/</gi, "&lt;").replace(/>/gi, "&gt;"));
    }
  });

  return new RegExp("(\\b" + keys.join("\\b|\\b") + "\\b)", "g");
};

exports.highlight = (content, current, ctx = context) => {
  if (current === "") {
    return content;
  }
  content = content
    .replace(/</gi, "&lt;")
    .replace(/>/gi, "&gt;")
    .replace(KEYWORDS, '<span class="token keyword">$1</span>')
    .replace(TYPES, '<span class="token keyword">$1</span>')
    .replace(/(=|:) "(\w+)"/g, `$1 <span class="token string">"$2"<\/span>`)
    .replace(/(\w+)\(/g, `<span class="token function">$1<\/span>(`)
    .replace(SEPARATOR, '<span class="token punctuation">$1</span>')
    .replace(/&gt<span class="token punctuation">;<\/span>/gi, "&gt;")
    .replace(/&lt<span class="token punctuation">;<\/span>/gi, "&lt;");

  content = content.replace(symbolsMatch(current, ctx), replacement);

  return content;
};

exports.bindSymbols = (content, current, ctx) =>
  content.replace(symbolsMatch(current, ctx), (match, $1, index, content) => replacement(match, $1, index, content, (ctx = context)));
