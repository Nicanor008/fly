import { BaseComponent } from "../common/BaseComponent";

class CustomTimer extends BaseComponent {
  constructor() {
    super();
    this._time = 0;
    this._interval = null;
    this._addStyles(`
      .timer {
        font-size: 24px;
        font-weight: bold;
      }
    `);
    this._addTemplate(`
      <div class="timer">Time: <span id="time">${this._time}</span> seconds</div>
      <button id="startBtn">Start</button>
      <button id="stopBtn">Stop</button>
    `);
    this._addEventListeners([
      ['#startBtn', 'click', this._start],
      ['#stopBtn', 'click', this._stop]
    ]);
  }

  _start() {
    this._interval = setInterval(() => {
      this._time++;
      this.shadowRoot.getElementById('time').textContent = this._time;
    }, 1000);
  }

  _stop() {
    clearInterval(this._interval);
  }

  disconnectedCallback() {
    clearInterval(this._interval);
  }
}

customElements.define('custom-timer', CustomTimer);
