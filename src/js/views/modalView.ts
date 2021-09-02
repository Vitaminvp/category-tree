import View from "./view";
import icons from "../../img/icons.svg";
import { KEYS } from "../config";

class ModalView extends View {
  _parentElement = document.querySelector(".modal");

  _window = document.querySelector(".modal-window");
  _overlay = document.querySelector(".overlay");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._hideModalHandler();
    this._submitHandler();
    this._handleTransition();
  }

  _selectHandler = () => {
    const input = this._parentElement.querySelector("form input[name='name']");
    if (input) input.select();
  };

  _openModal = () => {
    this._overlay.classList.remove("hidden");
    this._window.classList.remove("hidden");
  };

  _closeModal = () => {
    this._overlay.classList.add("hidden");
    this._window.classList.add("hidden");
    this._removeKeyPressHandler();
  };

  _handleKeyPress = e => {
    const { code } = e;

    if (code === KEYS.escape) {
      return this._closeModal();
    }

    if (code === KEYS.enter && this._data.alert) {
      e.preventDefault();
      return this._handleSubmit();
    }
  };

  _addKeyPressHandler = () => document.addEventListener("keydown", this._handleKeyPress);

  _removeKeyPressHandler = () =>
    document.removeEventListener("keydown", this._handleKeyPress);

  showModalHandler(data) {
    this._openModal();
    this.render(data);
    this._addKeyPressHandler();
  }

  _handleTransition() {
    this._overlay.addEventListener("transitionend", this._selectHandler);
  }

  _hideModalHandler = () => {
    this._btnClose.addEventListener("click", this._closeModal);
    this._overlay.addEventListener("click", this._closeModal);
  };

  _handleSubmit = () => {
    const [{ value }] = this._parentElement.elements;

    this._data.handler(value);
    this._closeModal();
  };

  _submitHandler = () => {
    this._parentElement.addEventListener("submit", e => {
      e.preventDefault();

      this._handleSubmit();
    });
  };

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
          title="Min length 3 and max length 55, no spaces in the beginning and in the end. No special chars allowed."
          required
          name="name"
          pattern="^\\b[\\w .-]{3,55}\\b$"
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
