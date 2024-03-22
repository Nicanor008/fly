class ToastNotification extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.timeToDisplay = parseInt(this.getAttribute('time-to-display')) || 5000;
    this.variant = this.getAttribute('variant') || 'info';
    this.title = this.getAttribute('title') || 'Notification';
    this.description = this.getAttribute('description') || '';
    this.ctaText = this.getAttribute('cta-text') || '';
    this.render();
  }

  connectedCallback() {
    if (this.timeToDisplay > 0) {
      setTimeout(() => {
        this.remove();
      }, this.timeToDisplay);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: ${this.getBackgroundColor()};
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }

        .toast-title {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .toast-description {
          margin-bottom: 10px;
        }

        .toast-close {
          position: absolute;
          top: 5px;
          right: 5px;
          cursor: pointer;
        }

        .toast-cta {
          display: inline-block;
          padding: 5px 10px;
          background-color: #fff;
          color: ${this.getBackgroundColor()};
          border: 1px solid ${this.getBackgroundColor()};
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          cursor: pointer;
          margin-top: 5px;
        }
      </style>
      <div class="toast">
        <span class="toast-close" onclick="this.parentElement.remove()">X</span>
        <div class="toast-title">${this.title}</div>
        <div class="toast-description">${this.description}</div>
        ${this.ctaText ? `<a class="toast-cta" href="#">${this.ctaText}</a>` : ''}
      </div>
    `;
  }

  getBackgroundColor() {
    switch (this.variant) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'warning':
        return 'orange';
      default:
        return 'blue';
    }
  }
}

customElements.define('toast-notification', ToastNotification);