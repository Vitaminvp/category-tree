import icons from 'url:../../img/icons.svg';
import { ERR_MESSAGE } from '../config';

export default class View {
  _data;
  _errorMessage = ERR_MESSAGE;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  render(data) {
    if (!data) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup(data);

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
