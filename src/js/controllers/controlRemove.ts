import { findListItem, isNotDefined } from "../helpers";
import * as model from "../model";
import { modalView, treeView } from "../views";
import { controlRender } from "./controlRender";
import { YOU_SURE } from "../config";
import { Category, FoundList } from "../types";

const DEL_AMOUNT = 1;

export const deleteItem = (list: Category[], idx: number, id: string) => () => {
  list.splice(idx, DEL_AMOUNT);

  treeView.remove({ handler: controlRender }, id);
};

export const controlRemove = function (id: string) {
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
