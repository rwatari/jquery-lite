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

  addClass(classes) {
    const classList = classes.split(" ");
    this.htmlEls.forEach(htmlEl => {
      const elClasses = Array.from(htmlEl.classList);
      classList.forEach(cls => {
        if (!elClasses.includes(cls)) {
          elClasses.push(cls);
        }
      });
      htmlEl.className = elClasses.join(" ");
    });

    return this;
  }

  removeClass(classes) {
    this.htmlEls.forEach(htmlEl => {
      if (classes === undefined) {
        htmlEl.className = "";
      } else {
        const classList = classes.split(" ");
        const elClasses = Array.from(htmlEl.classList);
        classList.forEach(cls => {
          const idx = elClasses.indexOf(cls);
          if (idx > -1) {
            elClasses.splice(idx, 1);
          }
        });

        htmlEl.className = elClasses.join(" ");
      }
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
}

module.exports = DOMNodeCollection;
