import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from '../model.js';
import treeView from '../views/treeView.js';
import { findListItem } from '../helpers';
import { controlRender } from './controlRender';

export const controlToggle = function (id) {
  try {
    const { list, idx } = findListItem(model.state, id);

    const current = list[idx];

    current.closed = !current.closed;

    controlRender();
  } catch (err) {
    treeView.renderError(err);
  }
};
