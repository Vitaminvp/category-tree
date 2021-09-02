import * as model from "../model";
import { findListItem, isNotDefined } from "../helpers";
import { EDIT_ITEM } from "../config";
import { treeView, modalView } from "../views";
import { Category, FoundList } from "../types";

export const controlEdit = function (id: string) {
  try {
    const { list, idx }: FoundList = findListItem(model.state, id);

    if (!list) return;

    const current = list[idx as number];

    modalView.showModalHandler({
      title: EDIT_ITEM,
      defaultValue: current.name,
      handler: editItem(current),
    });
  } catch (err) {
    treeView.renderError(err as string);
  }
};

const editItem = (currentItem: Category) => (name: string) => {
  if (isNotDefined(name)) return;

  currentItem.name = name;

  treeView.update(model.state);
};
