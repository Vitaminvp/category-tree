import View from './view.js';
import icons from 'url:../../img/icons.svg';

class ModalView extends View {
  _parentElement = document.querySelector('.modal');

  _window = document.querySelector('.modal-window');
  _overlay = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._hideModalHandler();
    this.submitHandler();
    this._handleTransition();
  }

  _selectHandler = () => {
    const input = this._parentElement.querySelector("form input[name='name']");
    if (input) input.select();
  };

  _toggleModal = () => {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  };

  showModalHandler(data) {
    this._toggleModal();
    this.render(data);
  }

  showAlertHandler(data) {
    this._toggleModal();
    this.render(data);
  }

  _handleTransition() {
    this._overlay.addEventListener('transitionend', this._selectHandler);
  }

  _hideModalHandler() {
    this._btnClose.addEventListener('click', this._toggleModal);
    this._overlay.addEventListener('click', this._toggleModal);
  }

  submitHandler() {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();

      const [{ value }] = this._parentElement.elements;

      this._toggleModal();
      this._data.handler(value);
    });
  }

  _generateMarkup({ title, defaultValue, alert }) {
    const btn = `
      <button class="btn modal__btn">
        <svg>
          <use href="${icons}#icon-check"/>
        </svg>
        <span>Confirm</span>
      </button>
    `;
    const header = `<h3 class="modal__heading">${title}</h3>`;

    if (alert) return header + btn;

    return `
      ${header}
      <div class="modal__input">
        <label>Category name</label>
        <input
          value="${defaultValue}"
          type="text"
          title="Min length 3 and max length 50, no spaces in the beginning and in the end. No special chars allowed."
          required
          name="name"
          pattern="^\\b[\\w \.]{3,55}\\b$"
          placeholder="Please, write category name"
          maxlength="55"
          minlength="3"
        />
      </div>
      ${btn}
    `;
  }
}

export default new ModalView();
