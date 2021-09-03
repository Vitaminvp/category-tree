import icons from "../../img/icons.svg";
import { ERR_MESSAGE } from "../config";
import { ArrowFn, Category } from "../types";
import { isNotDefined } from "../helpers";

export default abstract class View {
  protected _data: Category[] | undefined;
  protected _errorMessage = ERR_MESSAGE;

  protected abstract _parentElement: HTMLHtmlElement | unknown;
  protected abstract _generateMarkup(data?: Category[]): string;

  protected _clear(): void {
    (this._parentElement as HTMLHtmlElement).innerHTML = "";
  }

  render(data: Category[]): void {
    if (!data) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup(data);

    this._clear();
    (this._parentElement as HTMLHtmlElement).insertAdjacentHTML("afterbegin", markup);
  }

  private _findListItem(id: string): HTMLLIElement | undefined {
    return Array.from(
      (this._parentElement as HTMLHtmlElement).querySelectorAll("li"),
    ).find(item => item.dataset.id === id);
  }

  update(data: Category[]): void {
    this._data = data;

    const newMarkup = this._generateMarkup(data);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    const curElements = Array.from(
      (this._parentElement as HTMLHtmlElement).querySelectorAll("*"),
    ) as HTMLLIElement[];

    for (let i = 0; i < newElements.length; i++) {
      const curEl = curElements[i];
      const newEl = newElements[i];

      if (newEl.isEqualNode(curEl)) continue;

      if (newEl.firstChild?.nodeValue?.trim() !== "") {
        curEl.textContent = newEl.textContent;
      }

      Array.from(newEl.attributes).forEach(attr =>
        curEl.setAttribute(attr.name, attr.value),
      );
    }
  }

  remove(id: string, handler: ArrowFn): void {
    const curEl = this._findListItem(id);

    if (isNotDefined(curEl)) return;

    const parentList = (curEl as Node).parentNode as HTMLHtmlElement;

    parentList.removeChild(curEl);

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
      curEl.appendChild(newDOM);
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
