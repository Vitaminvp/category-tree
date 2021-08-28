import View from './View.js';
import icons from 'url:../../img/icons.svg';

class EmptyListView extends View {
  _parentElement = document.getElementById('create');

  clear() {
    this._clear();
  }

  addClickHandler(addHandler) {
    this._parentElement.addEventListener('click', function (e) {
      const addBtn = e.target.closest('.add-list-btn');

      if (!addBtn) return;

      addHandler();
    });
  }

  _generateMarkup() {
    this._clear();
    return `
          <div class="add-list">
            <div>
              <svg class="add-list-btn">
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </div>
          </div>
      `;
  }
}

export default new EmptyListView();
