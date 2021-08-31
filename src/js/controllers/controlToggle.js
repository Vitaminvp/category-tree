import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from '../model.js';
import { treeView } from '../views';
import { findListItem } from '../helpers';

export const controlToggle = function (id) {
  try {
    const { list, idx } = findListItem(model.state, id);

    const current = list[idx];

    current.closed = !current.closed;

    treeView.update(model.state);
  } catch (err) {
    treeView.renderError(err);
  }
};
