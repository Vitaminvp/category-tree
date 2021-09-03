import { findListItem, isNotDefined } from "../helpers";
import * as model from "../model";
import { modalView, treeView } from "../views";
import { controlRender } from "./controlRender";
import { DEL_AMOUNT, YOU_SURE } from "../config";
import { Category, FoundList } from "../types";

export const deleteItem = (list: Category[], idx: number, id: string) => (): void => {
  list.splice(idx, DEL_AMOUNT);

  treeView.remove(id, controlRender);
};

export const controlRemove = (id: string): void => {
  try {
    const { list, idx }: FoundList = findListItem(model.state, id);

    if (isNotDefined(list)) return;

    modalView.showModalHandler({
      title: YOU_SURE,
      handler: deleteItem(list, idx as number, id),
      alert: true,
    });
  } catch (err) {
    treeView.renderError(err as string);
  }
};
