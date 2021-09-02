import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "../model";
import { treeView } from "../views";
import { findListItem, isNotDefined } from "../helpers";
import { Category, FoundList } from "../types";

export const controlToggle = function (id: string) {
  try {
    const { list, idx }: FoundList = findListItem(model.state, id);

    if (isNotDefined(list)) return;

    const current = list[idx as number] as Category;

    current.closed = !current.closed;

    treeView.update(model.state);
  } catch (err) {
    treeView.renderError(err as string);
  }
};
