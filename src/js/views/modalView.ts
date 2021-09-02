import View from "./view";
import icons from "../../img/icons.svg";
import { KEYS } from "../config";
import { ModalMarkUp } from "../types";

class ModalView extends View {
  _parentElement = document.querySelector(".modal") as HTMLFormElement;

  _window = document.querySelector(".modal-window") as HTMLHtmlElement;
  _overlay = document.querySelector(".overlay") as HTMLHtmlElement;
  _btnClose = document.querySelector(".btn--close-modal") as HTMLHtmlElement;

  private _options = {} as ModalMarkUp;

  constructor() {
    super();
    this._hideModalHandler();
    this._submitHandler();
    this._handleTransition();
  }

  private _selectHandler = (): void => {
    const input = this._parentElement.querySelector(
      "form input[name='name']",
    ) as HTMLInputElement;
    if (input) input.select();
  };

  private _openModal = (): void => {
    this._overlay?.classList.remove("hidden");
    this._window?.classList.remove("hidden");
  };

  private _closeModal = (): void => {
    this._overlay?.classList.add("hidden");
    this._window?.classList.add("hidden");
    this._removeKeyPressHandler();
  };

  private _handleKeyPress = (e: KeyboardEvent): void => {
    const { code } = e;

    if (code === KEYS.escape) {
      return this._closeModal();
    }

    if (code === KEYS.enter && this._options?.alert) {
      e.preventDefault();
      return this._handleSubmit();
    }
  };

  private _addKeyPressHandler = (): void =>
    document.addEventListener("keydown", this._handleKeyPress);

  private _removeKeyPressHandler = (): void =>
    document.removeEventListener("keydown", this._handleKeyPress);

  showModalHandler(options: ModalMarkUp): void {
    this._options = options;
    this._openModal();
    this.render([]);
    this._addKeyPressHandler();
  }

  private _handleTransition(): void {
    this._overlay.addEventListener("transitionend", this._selectHandler);
  }

  private _hideModalHandler = (): void => {
    this._btnClose.addEventListener("click", this._closeModal);
    this._overlay.addEventListener("click", this._closeModal);
  };

  private _handleSubmit = (): void => {
    const [InputElement] = Array.from(this._parentElement.elements);
    const { value } = InputElement as HTMLInputElement;

    this._options.handler?.(value);
    this._closeModal();
  };

  private _submitHandler = (): void => {
    this._parentElement?.addEventListener("submit", e => {
      e.preventDefault();

      this._handleSubmit();
    });
  };

  _generateMarkup(): string {
    const { title, defaultValue, alert } = this._options;
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
