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
}

module.exports = DOMNodeCollection;
