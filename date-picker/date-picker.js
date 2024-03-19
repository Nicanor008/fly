class DatePicker extends HTMLElement {
    constructor() {
      super();
  
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          .calendar {
            position: absolute;
            border: 1px solid #ccc;
            background-color: #fff;
            padding: 10px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            display: none;
          }
  
          .calendar-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
  
          .calendar-body {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
          }
  
          .calendar-body span {
            display: block;
            padding: 5px;
            text-align: center;
          }
  
          .calendar-body span:hover {
            background-color: #f0f0f0;
          }
  
          .selected {
            background-color: #007bff;
            color: #fff;
          }
  
          .hide {
            display: none;
          }
        </style>
        <input type="text" id="datepicker" readonly>
        <div class="calendar" id="calendar">
          <div class="calendar-header">
            <span id="prevMonth">&lt;</span>
            <span id="currentMonth"></span>
            <span id="nextMonth">&gt;</span>
          </div>
          <div class="calendar-body" id="calendar-body"></div>
        </div>
      `;
      
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
  
      this.datePicker = this.shadowRoot.getElementById('datepicker');
      this.calendar = this.shadowRoot.getElementById('calendar');
    this.currentMonthElement = this.shadowRoot.getElementById('currentMonth');
      this.calendarBody = this.shadowRoot.getElementById('calendar-body');
  
      this.currentYear = new Date().getFullYear();
      this.currentMonth = new Date().getMonth();
      this.selectedDate = null;
    }
  
    connectedCallback() {
        // Initial setup
        this.updateCalendar();
    
        // Event listeners
        this.datePicker.addEventListener('click', () => this.showCalendar());
        this.shadowRoot.getElementById('prevMonth').addEventListener('click', () => this.prevMonth());
        this.shadowRoot.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());
        document.addEventListener('click', (event) => {
          if (!this.contains(event.target) && event.target !== this.datePicker) {
            this.hideCalendar();
          }
        });
      }
  
    generateCalendar(year, month) {
      this.calendarBody.innerHTML = '';
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month + 1, 0).getDate();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
      this.currentMonthElement.textContent = `${new Date(year, month).toLocaleDateString('default', { month: 'long' })} ${year}`;
  
      for (let day of days) {
        const cell = document.createElement('span');
        cell.textContent = day;
        this.calendarBody.appendChild(cell);
      }
  
      for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement('span');
        this.calendarBody.appendChild(cell);
      }
  
      for (let i = 1; i <= lastDate; i++) {
        const cell = document.createElement('span');
        cell.textContent = i;
        cell.addEventListener('click', () => {
          this.selectedDate = new Date(year, month, i);
          this.updateSelectedDate();
        });
        this.calendarBody.appendChild(cell);
      }
    }

    updateCalendar() {
        // Update the calendar with the current month and year
        this.currentMonthElement.textContent = `${new Date(this.currentYear, this.currentMonth).toLocaleDateString('default', { month: 'long' })} ${this.currentYear}`;
        this.generateCalendar(this.currentYear, this.currentMonth);
      }
  
    updateSelectedDate() {
      const cells = this.calendarBody.querySelectorAll('span');
      cells.forEach(cell => cell.classList.remove('selected'));
      const selectedCell = this.calendarBody.querySelector(`span:nth-child(${this.selectedDate.getDate() + 1 + this.selectedDate.getDay()})`);
      if (selectedCell) {
        selectedCell.classList.add('selected');
      }
      this.datePicker.value = this.selectedDate.toLocaleDateString();
      this.hideCalendar();
    }
  
    showCalendar() {
      this.calendar.style.display = 'block';
    }
  
    hideCalendar() {
      this.calendar.style.display = 'none';
    }
  
    prevMonth() {
        if (this.currentMonth === 0) {
          this.currentYear -= 1;
          this.currentMonth = 11;
        } else {
          this.currentMonth -= 1;
        }
        this.updateCalendar();
      }
  
    nextMonth() {
        if (this.currentMonth === 11) {
          this.currentYear += 1;
          this.currentMonth = 0;
        } else {
          this.currentMonth += 1;
        }
        this.updateCalendar();
      }
  }
  
  customElements.define('date-picker', DatePicker);
  