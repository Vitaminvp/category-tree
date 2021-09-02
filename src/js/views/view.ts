import icons from "../../img/icons.svg";
import { ERR_MESSAGE } from "../config";
import { ArrowFn, Category } from "../types";

export default abstract class View {
  protected _data: Category[] | undefined;
  abstract _parentElement: HTMLHtmlElement | unknown;
  abstract _generateMarkup(data?: Category[]): string;

  protected _errorMessage = ERR_MESSAGE;

  _clear(): void {
    (this._parentElement as HTMLHtmlElement).innerHTML = "";
  }

  render(data: Category[]): void {
    if (!data) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup(data);

    this._clear();
    (this._parentElement as HTMLHtmlElement).insertAdjacentHTML("afterbegin", markup);
  }

  update(data: Category[]): void {
    this._data = data;

    const newMarkup = this._generateMarkup(data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    const curElements = Array.from(
      (this._parentElement as HTMLHtmlElement).querySelectorAll("*"),
    ) as HTMLLIElement[];

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (!newEl.isEqualNode(curEl) && newEl?.firstChild?.nodeValue?.trim() !== "") {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value),
        );
      }
    });
  }

  _findListItem(id: string): HTMLLIElement | undefined {
    return Array.from(
      (this._parentElement as HTMLHtmlElement).querySelectorAll("li"),
    ).find(item => item.dataset.id === id);
  }

  remove(id: string, handler: ArrowFn): void {
    const curEl = this._findListItem(id);
    const parentList = curEl?.parentNode as HTMLHtmlElement;

    parentList.removeChild(curEl as Node);

    const grandParent = parentList.parentNode as HTMLHtmlElement;

    const hasChild = Array.from(parentList.childNodes).some(
      node => node.nodeType !== Node.TEXT_NODE,
    );

    if (!hasChild) {
      grandParent.removeChild(parentList);
      grandParent.classList.remove("has-children");
    }
    if (grandParent?.id === "root") handler();
  }

  create(data: Category[], id: string): void {
    const curEl = this._findListItem(id) as HTMLLIElement;

    const markup = this._generateMarkup(data);

    const list = curEl.querySelector(".list");

    curEl.classList.add("has-children");

    curEl.classList.remove("closed");

    const newDOM = document.createRange().createContextualFragment(markup);

    if (list) {
      (list.parentNode as Node).replaceChild(newDOM, list);
    } else {
      (curEl as Node).appendChild(newDOM);
    }
  }

  renderError(message: string = this._errorMessage): void {
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
    (this._parentElement as HTMLHtmlElement).insertAdjacentHTML("afterbegin", markup);
  }
}
