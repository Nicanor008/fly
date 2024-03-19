// import {BaseComponent} from "../common/BaseComponent";
// import { BaseComponent } from "../common/BaseComponent";

import { BaseComponent } from "../common/BaseComponent";

class CustomCounter extends BaseComponent {
  constructor() {
    super();
    this._count = 0;
    this._addStyles(`
      .counter {
        font-size: 24px;
        font-weight: bold;
      }
      .button {
        padding: 8px 16px;
        margin: 8px;
        background-color: red !important;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `);
    this._addTemplate(`
      <div class="counter">Counter: <span id="count">${this._count}</span></div>
      <button class="button" id="incrementBtn">Increment</button>
      <button class="button" id="decrementBtn">Decrement</button>
    `);
    this._addEventListeners([
      ['#incrementBtn', 'click', this._increment],
      ['#decrementBtn', 'click', this._decrement]
    ]);
  }

  get count() {
    return this._count;
  }

  set count(value) {
    this._count = value;
    this.shadowRoot.getElementById('count').textContent = this._count;
  }

  _increment() {
    this.count++;
  }

  _decrement() {
    this.count--;
  }
}

customElements.define('custom-counter', CustomCounter);
