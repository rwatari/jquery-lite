class DOMNodeCollection {
  constructor(htmlEls) {
    this.htmlEls = htmlEls;
  }

  html(string = null) {
    if (string === null) {
      return this.htmlEls[0].innerHTML;
    } else {
      this.htmlEls.forEach(htmlEl => {
        htmlEl.innerHTML = string;
      });
      return this;
    }
  }

  empty() {
    return this.html("");
  }

  append(arg) {
    if (arg instanceof DOMNodeCollection) {
      const args = Array.from(arg.htmlEls);
      arg.remove();
      this.htmlEls.forEach(htmlEl => {
        args.forEach(argEl => {
          htmlEl.innerHTML += argEl.outerHTML;
        });
      });
    } else if (arg instanceof HTMLElement) {
      this.htmlEls.forEach(htmlEl => {
        htmlEl.innerHTML += arg.outerHTML;
      });
    } else if (typeof arg === 'string') {
      this.htmlEls.forEach(htmlEl => {
        htmlEl.innerHTML += arg;
      });
    }

    return this;
  }

  // Attribute methods

  attr(attribute, value) {
    if (value === undefined) {
      return this.htmlEls[0].getAttribute(attribute);
    } else {
      this.htmlEls.forEach(htmlEl => {
        if (value === null) {
          htmlEl.removeAttribute(attribute);
        } else {
          htmlEl.setAttribute(attribute, value);
        }
      });

      return this;
    }
  }

  addClass(...classes) {
    this.htmlEls.forEach(htmlEl => {
      htmlEl.classList.add(...classes);
    });

    return this;
  }

  removeClass(...classes) {
    this.htmlEls.forEach(htmlEl => {
      htmlEl.classList.remove(...classes);
    });

    return this;
  }

  // Traversal methods

  children() {
    let allChildren =  [];
    this.htmlEls.forEach(htmlEl => {
      const kids = Array.from(htmlEl.children);
      allChildren = allChildren.concat(kids);
    });

    return new DOMNodeCollection(allChildren);
  }

  parent() {
    const allParents = [];
    this.htmlEls.forEach(htmlEl => {
      const parent = htmlEl.parentNode;
      if (!allParents.includes(parent)) {
        allParents.push(parent);
      }
    });

    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    let allMatches = [];
    this.htmlEls.forEach(htmlEl => {
      const matches = Array.from(htmlEl.querySelectorAll(selector));
      allMatches = allMatches.concat(matches);
    });

    return new DOMNodeCollection(allMatches);
  }

  remove() {
    this.htmlEls.forEach(htmlEl => htmlEl.remove());
    this.htmlEls = [];
  }

  // Event handlers

  on(event, callback) {
    this.htmlEls.forEach(htmlEl => {
      htmlEl.addEventListener(event, callback);
      const eventAttr = `_on${event}`;
      if (htmlEl[eventAttr] === undefined) {
        htmlEl[eventAttr] = [callback];
      } else {
        htmlEl[eventAttr].push(callback);
      }
    });

    return this;
  }

  off(event) {
    const eventAttr = `_on${event}`;
    this.htmlEls.forEach(htmlEl => {
      htmlEl[eventAttr].forEach(callback => {
        htmlEl.removeEventListener(event, callback);
      });
    });

    return this;
  }
}

module.exports = DOMNodeCollection;
