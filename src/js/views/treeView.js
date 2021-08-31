import icons from 'url:../../img/icons.svg';
import View from './view';

const listClass = {
  child: 'list-item-child',
  delete: 'list-item-delete',
  add: 'list-item-add',
  edit: 'list-item-edit',
  toggle: 'list-item-toggle',
};

class TreeView extends View {
  _parentElement = document.getElementById('root');

  _generateListContent(id, name) {
    return `
      <span class="${listClass.child} ${listClass.toggle}" data-id="${id}">${name}</span>
      <span title="Delete item" class="${listClass.child} ${listClass.delete}" data-id="${id}">
        <svg>
          <use href="${icons}#icon-minus-circle"/>
        </svg>
      </span>
      <span title="Add item" class="${listClass.child} ${listClass.add}" data-id="${id}">
        <svg>
          <use href="${icons}#icon-plus-circle"/>
        </svg>
      </span>
      <span title="Edit item" class="${listClass.child} ${listClass.edit}" data-id="${id}">
        <svg>
          <use href="${icons}#icon-edit"/>
        </svg>
      </span>
    `;
  }

  _generateMarkup(data = []) {
    return `
      <ul class="list">
        ${data
          .map(({ children, id, name, closed }, idx) => {
            if (children && children.length) {
              return `
                <li class="list-item has-children ${closed ? 'closed' : 'opened'}">
                  ${this._generateListContent(id, name)}
                  ${this._generateMarkup(children)}
                </li>`;
            }

            return `
              <li class="list-item">
                ${this._generateListContent(id, name)}
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
      const child = e.target.closest(`.${listClass.child}`);

      if (!child) return;

      const id = child.dataset.id;

      if (child.classList.contains(listClass.add)) return addHandler(id);
      if (child.classList.contains(listClass.delete)) return removeHandler(id);
      if (child.classList.contains(listClass.edit)) return editHandler(id);
      if (child.classList.contains(listClass.toggle)) return toggleHandler(id);
    });
  }
}

export default new TreeView();
