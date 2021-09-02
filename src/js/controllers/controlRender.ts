import { treeView, emptyListView } from "../views";
import * as model from "../model";
import { isZeroLength } from "../helpers";

export const controlRender = function () {
  try {
    if (isZeroLength(model.state)) {
      // @ts-ignore
      emptyListView.render(model.state);
    } else {
      emptyListView.clear();
    }

    treeView.render(model.state);
  } catch (err) {
    treeView.renderError(err as string);
  }
};
