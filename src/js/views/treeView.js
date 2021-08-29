import icons from 'url:../../img/icons.svg';
import View from './view';

class TreeView extends View {
  _parentElement = document.getElementById('root');

  _generateIcons(id) {
    return `
      <span title="Delete item">
        <svg class="list-item-child list-item-delete" data-id="${id}">
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </span>
      <span title="Add item">
        <svg class="list-item-child list-item-add" data-id="${id}">
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </span>
      <span title="Edit item">
        <svg class="list-item-child list-item-edit" data-id="${id}">
          <use href="${icons}#icon-edit"></use>
        </svg>
      </span>
    `;
  }

  _generateMarkup(data = []) {
    return `
      <ul class="list">
        ${data
          .map(({ children, id, name, closed }, idx) => {
            const lastChild = data.length - 1 === idx ? 'last-child' : '';

            if (children && children.length) {
              return `
                <li class="list-item has-children ${closed ? 'closed' : ''} ${lastChild}">
                  <span class="list-item-child list-item-toggle" data-id="${id}">${name}</span>
                  ${this._generateIcons(id)}
                  ${this._generateMarkup(children)}
                </li>`;
            }

            return `
              <li class="list-item ${lastChild}">
                <span class="list-item-child list-item-toggle" data-id="${id}">${name}</span>
                ${this._generateIcons(id)}
              </li>`;
          })
          .join('')}

      </ul>
    `;
  }

  addRenderHandler(handler) {
    window.addEventListener('load', handler);
  }

  addClickHandler(addHandler, removeHandler, editHandler, toggleHandler) {
    this._parentElement.addEventListener('click', function (e) {
      const child = e.target.closest('.list-item-child');

      if (!child) return;

      const id = child.dataset.id;

      if (child.classList.contains('list-item-add')) return addHandler(id);
      if (child.classList.contains('list-item-delete')) return removeHandler(id);
      if (child.classList.contains('list-item-edit')) return editHandler(id);
      if (child.classList.contains('list-item-toggle')) return toggleHandler(id);
    });
  }
}

export default new TreeView();
