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

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup(data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
      }
    });
  }

  // TODO Virtual DOM update
  // modify(data) {
  //   this._data = data;
  //   const newMarkup = this._generateMarkup(data);
  //
  //   const newDOM = document.createRange().createContextualFragment(newMarkup);
  //   const newElements = Array.from(newDOM.querySelectorAll('*'));
  //   const curElements = Array.from(this._parentElement.querySelectorAll('*'));
  //
  //   newElements.forEach((newEl, i) => {
  //     const curEl = curElements[i];
  //
  //     if (isNotDefined(curEl)) {
  //       curElements[i - 1]?.closest('.list-item').appendChild(newEl);
  //     }
  //   });
  //
  //   curElements.forEach((curEl, i) => {
  //     const newEl = newElements[i];
  //
  //     if (isNotDefined(newEl)) {
  //       curEl.parentElement.removeChild(curEl);
  //     }
  //   });
  // }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"/>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
