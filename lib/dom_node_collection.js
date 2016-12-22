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
    this.htmlEls.forEach(htmlEl => {
      if (arg instanceof DOMNodeCollection) {
        // TODO: need to make sure to remove arg instances from DOM
        arg.htmlEls.forEach(argEl => {
          htmlEl.innerHTML += argEl.outerHTML;
        });
      } else if (arg instanceof HTMLElement) {
        htmlEl.innerHTML += arg.outerHTML;
      } else if (typeof arg === 'string') {
        htmlEl.innerHTML += arg;
      }
    });

    return this;
  }

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
}

module.exports = DOMNodeCollection;
