import { findListItem, getUnId, isNotDefined } from "../helpers";
import * as model from "../model";
import { ADD_ITEM } from "../config";
import { treeView, modalView } from "../views";
import { FoundList, Category } from "../types";

const addItem =
  (currentItem: Category, id: string) =>
  (name: string): void => {
    if (isNotDefined(name)) return;

    const childrenList = currentItem.children;
    const newItem = {
      id: getUnId(),
      name,
    };

    currentItem.children = childrenList ? [...childrenList, newItem] : [newItem];
    currentItem.closed = false;

    treeView.create(currentItem.children, id);
  };

export const controlAdd = (id: string): void => {
  try {
    const { list, idx }: FoundList = findListItem(model.state, id);

    if (isNotDefined(list)) return;

    const current = list[idx as number] as Category;

    modalView.showModalHandler({
      title: ADD_ITEM,
      defaultValue: current.name,
      handler: addItem(current, id),
    });
  } catch (err) {
    treeView.renderError(err as string);
  }
};
