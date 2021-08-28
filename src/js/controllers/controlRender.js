import treeView from '../views/treeView';
import emptyListView from '../views/emptyListView';
import * as model from '../model';
import { isZeroLength } from '../helpers';

export const controlRender = function () {
  try {
    if (isZeroLength(model.state)) {
      emptyListView.render(model.state);
    } else {
      emptyListView.clear();
    }

    treeView.render(model.state);
  } catch (err) {
    treeView.renderError();
    console.error(err);
  }
};
