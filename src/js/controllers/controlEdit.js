import { findListItem, isNotDefined } from '../helpers';
import * as model from '../model';
import { ENTER_NEW_NAME, ERR_EMPTY_STR } from '../config';
import treeView from '../views/treeView';
import { controlRender } from './controlRender';

export const controlEdit = function (id) {
  try {
    const { list, idx } = findListItem(model.state, id);
    const newName = prompt(ENTER_NEW_NAME, list[idx].name);

    if (isNotDefined(newName)) return;

    if (newName.length === 0) return alert(ERR_EMPTY_STR);

    list[idx].name = newName;

    controlRender();
  } catch (err) {
    treeView.renderError();
    console.error(err);
  }
};
