import icons from "../../img/icons.svg";
import View from "./view";

const listClass = {
  child: "list-item-child",
  delete: "list-item-delete",
  add: "list-item-add",
  edit: "list-item-edit",
  toggle: "list-item-toggle",
  item: "list-item",
};

class TreeView extends View {
  private _parentElement = document.getElementById("root") as HTMLLIElement;

  _generateListContent(name: string) {
    return `
      <span class="${listClass.child} ${listClass.toggle}">${name}</span>
      <span title="Delete item" class="${listClass.child} ${listClass.delete}">
        <svg>
          <use href="${icons}#icon-minus-circle"/>
        </svg>
      </span>
      <span title="Add item" class="${listClass.child} ${listClass.add}">
        <svg>
          <use href="${icons}#icon-plus-circle"/>
        </svg>
      </span>
      <span title="Edit item" class="${listClass.child} ${listClass.edit}">
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
          .map(({ children, id, name, closed }) => {
            if (children && children.length) {
              return `
                <li class="list-item has-children ${
                  closed ? "closed" : ""
                }" data-id="${id}">
                  ${this._generateListContent(name)}
                  ${this._generateMarkup(children)}
                </li>`;
            }

            return `
              <li class="list-item" data-id="${id}">
                ${this._generateListContent(name)}
              </li>`;
          })
          .join("")}

      </ul>
    `;
  }

  addRenderHandler(handler: Function) {
    window.addEventListener("load", handler);
  }

  addClickHandler(addHandler, removeHandler, editHandler, toggleHandler) {
    this._parentElement.addEventListener("click", function (e) {
      const listItem = e.target.closest(`.${listClass.item}`);
      const icon = e.target.closest(`.${listClass.child}`);

      if (!listItem || !icon) return;

      const id = listItem.dataset.id;

      if (icon.classList.contains(listClass.add)) return addHandler(id);
      if (icon.classList.contains(listClass.delete)) return removeHandler(id);
      if (icon.classList.contains(listClass.edit)) return editHandler(id);
      if (icon.classList.contains(listClass.toggle)) return toggleHandler(id);
    });
  }
}

export default new TreeView();
