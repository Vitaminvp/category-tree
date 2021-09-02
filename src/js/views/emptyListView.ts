import View from "./view";
import icons from "../../img/icons.svg";
import { ArrowFn } from "../types";

class EmptyListView extends View {
  _parentElement = document.getElementById("create") as HTMLHtmlElement;

  clear = this._clear;

  addClickHandler(addHandler: ArrowFn): void {
    this._parentElement.addEventListener("click", ({ target }: MouseEvent) => {
      const addBtn = (target as HTMLInputElement).closest(".add-list-btn");

      if (!addBtn) return;

      addHandler();
    });
  }

  _generateMarkup(): string {
    return `
      <div class="add-list">
        <svg class="add-list-btn">
          <use href="${icons}#icon-plus-circle"/>
        </svg>
      </div>
      `;
  }
}

export default new EmptyListView();
