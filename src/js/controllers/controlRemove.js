import { findListItem } from '../helpers';
import * as model from '../model';
import treeView from '../views/treeView';
import { controlRender } from './controlRender';

export const controlRemove = function (id) {
  try {
    const { list, idx } = findListItem(model.state, id);

    list.splice(idx, 1);

    controlRender();
  } catch (err) {
    treeView.renderError(err);
  }
};
