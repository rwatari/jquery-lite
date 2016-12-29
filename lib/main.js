const DOMNodeCollection = require("./dom_node_collection.js");

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
      $l.loadQueue.push(arg);
    }
  }
}

$l.loadQueue = [];

$l.extend = (obj1, ...otherObjs) => {
  otherObjs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      obj1[key] = obj[key];
    });
  });

  return obj1;
};

document.addEventListener('DOMContentLoaded', () => {
  $l.loadQueue.forEach(callback => callback());
});

window.$l = $l;
