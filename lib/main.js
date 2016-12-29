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

$l.ajax = options => {
  const def = {
    method: 'GET',
    url: window.location.href,
    data: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: (response => response),
    error: ((...errors) => console.log("There was an error!"))
  };

  $l.extend(def, options);

  if (def.type) {
    def.method = def.type;
  }

  const xhr = new XMLHttpRequest();
  xhr.open(def.method, def.url);
  xhr.setRequestHeader('Content-Type', def.contentType);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      let responseType = xhr.getResponseHeader('Content-Type');
      if (responseType.includes('json')) {
        def.success(JSON.parse(xhr.response));
      } else {
        def.success(xhr.response);
      }
    } else {
      def.error(xhr.response);
    }
  };
  xhr.send(def.data);
};

document.addEventListener('DOMContentLoaded', () => {
  $l.loadQueue.forEach(callback => callback());
});

window.$l = $l;
