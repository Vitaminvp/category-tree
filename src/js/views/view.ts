import icons from "../../img/icons.svg";
import { ERR_MESSAGE } from "../config";

export default class View {
  // @ts-ignore
  private _data;
  private _errorMessage = ERR_MESSAGE;

  _clear() {
    // @ts-ignore
    this._parentElement.innerHTML = "";
  }
  // @ts-ignore
  render(data) {
    if (!data) return this.renderError();

    this._data = data;
    // @ts-ignore
    const markup = this._generateMarkup(data);

    this._clear();
    // @ts-ignore
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  // @ts-ignore
  update(data) {
    this._data = data;
    // @ts-ignore
    const newMarkup = this._generateMarkup(data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    // @ts-ignore
    const curElements = Array.from(
      // @ts-ignore
      this._parentElement.querySelectorAll("*"),
    ) as HTMLLIElement[];

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // @ts-ignore
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value),
        );
      }
    });
  }

  _findListItem(id: string) {
    // @ts-ignore
    return Array.from(this._parentElement.querySelectorAll("li")).find(
      // @ts-ignore
      item => item.dataset.id === id,
    );
  }
  // @ts-ignore
  remove(data, id: string) {
    this._data = data;

    const curEl = this._findListItem(id);
    // @ts-ignore
    const parentList = curEl.parentNode;

    parentList.removeChild(curEl);

    const grandParent = parentList.parentNode;

    const hasChild = Array.from(parentList.childNodes).some(
      // @ts-ignore
      node => node.nodeType !== Node.TEXT_NODE,
    );

    if (!hasChild) {
      grandParent.removeChild(parentList);
      grandParent.classList.remove("has-children");
    }
    if (grandParent.id === "root") this._data.handler();
  }
  // @ts-ignore
  create(data, id) {
    const curEl = this._findListItem(id);
    // @ts-ignore
    const markup = this._generateMarkup(data);
    // @ts-ignore
    const list = curEl.querySelector(".list");
    // @ts-ignore
    curEl.classList.add("has-children");
    // @ts-ignore
    curEl.classList.remove("closed");

    const newDOM = document.createRange().createContextualFragment(markup);

    if (list) {
      list.parentNode.replaceChild(newDOM, list);
    } else {
      // @ts-ignore
      curEl.appendChild(newDOM);
    }
  }

  renderError(message: string = this._errorMessage) {
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
    // @ts-ignore
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
