const DOMNodeCollection = require("./dom_node_collection.js");

const loadQueue = [];

function $l(arg) {
  if (typeof arg === 'string') {
    // if type is string, then must be CSS selector
    const list = document.querySelectorAll(arg);
    return new DOMNodeCollection(Array.prototype.slice.call(list));
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (arg instanceof Function) {
    if (document.readyState === "complete") {
      arg();
    } else {
      loadQueue.push(arg);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadQueue.forEach(callback => callback());
});

window.$l = $l;
