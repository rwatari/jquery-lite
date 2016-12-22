const DOMNodeCollection = require("./dom_node_collection.js");

function $l(arg) {
  if (typeof arg === 'string') {
    // if type is string, then must be CSS selector
    const list = document.querySelectorAll(arg);
    return new DOMNodeCollection(Array.prototype.slice.call(list));
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  }
}

window.$l = $l;
