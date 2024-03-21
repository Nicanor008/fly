class PaginationComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.totalPages = parseInt(this.getAttribute('total-pages')) || 1;
    this.totalItems = parseInt(this.getAttribute('total-items')) || 0;
    this.currentPage = 1;
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#prev').addEventListener('click', () => this.prevPage());
    this.shadowRoot.querySelector('#next').addEventListener('click', () => this.nextPage());
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button {
          margin: 0 5px;
          cursor: pointer;
          padding: 5px 10px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      </style>
      <div class="pagination">
        <button id="prev" disabled>Previous</button>
        <span>Page ${this.currentPage} of ${this.totalPages}</span>
        <span>Total Items: ${this.totalItems}</span>
        <button id="next" ${this.currentPage === this.totalPages ? 'disabled' : ''}>Next</button>
      </div>
    `;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateButtons();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateButtons();
    }
  }

  updateButtons() {
    const prevButton = this.shadowRoot.querySelector('#prev');
    const nextButton = this.shadowRoot.querySelector('#next');

    prevButton.disabled = this.currentPage === 1;
    nextButton.disabled = this.currentPage === this.totalPages;

    const pageSpan = this.shadowRoot.querySelector('span');
    pageSpan.textContent = `Page ${this.currentPage} of ${this.totalPages}`;

    // Remove existing total items span
    const existingItemCountSpan = this.shadowRoot.querySelector('.item-count');
    if (existingItemCountSpan) {
        existingItemCountSpan.remove();
    }

    // Add new total items span
    const itemCountSpan = document.createElement('span');
    itemCountSpan.textContent = `Total Items: ${this.totalItems}`;
    itemCountSpan.classList.add('item-count');
}

}

customElements.define('pagination-component', PaginationComponent);