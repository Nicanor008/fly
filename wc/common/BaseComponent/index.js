class BaseComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    _addStyles(styles) {
      const styleElement = document.createElement('style');
      styleElement.textContent = styles;
      this.shadowRoot.appendChild(styleElement);
    }
  
    _addTemplate(html) {
      this.shadowRoot.innerHTML = html;
    }
  
    _addEventListeners(listeners) {
      for (const [selector, event, handler] of listeners) {
        this.shadowRoot.querySelector(selector).addEventListener(event, handler.bind(this));
      }
    }
  }
  