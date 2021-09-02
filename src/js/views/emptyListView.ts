import View from "./view";
import icons from "../../img/icons.svg";

class EmptyListView extends View {
  _parentElement = document.getElementById("create");
  // @ts-ignore
  clear = this._clear;
  // @ts-ignore
  addClickHandler(addHandler) {
    // @ts-ignore
    this._parentElement.addEventListener("click", function ({ target }) {
      // @ts-ignore
      const addBtn = target.closest(".add-list-btn");

      if (!addBtn) return;

      addHandler();
    });
  }

  _generateMarkup() {
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
