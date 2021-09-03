import icons from "../../img/icons.svg";
import View from "./view";
import { ArrowFn, Category } from "../types";
import { ListClass } from "../config";
import { isZeroLength } from "../helpers";

class TreeView extends View {
  _parentElement = document.getElementById("root") as HTMLHtmlElement;

  private _generateListContent(name: string): string {
    return `
      <span class="${ListClass.child} ${ListClass.toggle}">${name}</span>
      <span title="Delete item" class="${ListClass.child} ${ListClass.delete}">
        <svg>
          <use href="${icons}#icon-minus-circle"/>
        </svg>
      </span>
      <span title="Add item" class="${ListClass.child} ${ListClass.add}">
        <svg>
          <use href="${icons}#icon-plus-circle"/>
        </svg>
      </span>
      <span title="Edit item" class="${ListClass.child} ${ListClass.edit}">
        <svg>
          <use href="${icons}#icon-edit"/>
        </svg>
      </span>
    `;
  }

  _generateMarkup(data: Category[] = []): string {
    return `
      <ul class="list">
        ${data
          .map(({ children, id, name, closed }: Category) => {
            if (children && !isZeroLength(children)) {
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

  addRenderHandler(handler: ArrowFn): void {
    window.addEventListener("load", handler);
  }

  addClickHandler(
    addHandler: Function,
    removeHandler: Function,
    editHandler: Function,
    toggleHandler: Function,
  ): void {
    this._parentElement.addEventListener("click", ({ target }: MouseEvent) => {
      const listItem = (target as HTMLHtmlElement).closest(
        `.${ListClass.item}`,
      ) as HTMLHtmlElement;
      const icon = (target as HTMLHtmlElement).closest(`.${ListClass.child}`);

      if (!listItem || !icon) return;

      const id = listItem.dataset.id;

      if (icon.classList.contains(ListClass.add)) return addHandler(id);
      if (icon.classList.contains(ListClass.delete)) return removeHandler(id);
      if (icon.classList.contains(ListClass.edit)) return editHandler(id);
      if (icon.classList.contains(ListClass.toggle)) return toggleHandler(id);
    });
  }
}

export default new TreeView();
