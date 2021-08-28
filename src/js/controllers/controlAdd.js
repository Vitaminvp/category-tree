import { findListItem, getUnId, isNotDefined } from '../helpers';
import * as model from '../model';
import { ENTER_NAME, ERR_EMPTY_STR } from '../config';
import treeView from '../views/treeView';
import { controlRender } from './controlRender';

export const controlAdd = function (id) {
  try {
    const { list, idx } = findListItem(model.state, id);
    const current = list[idx];

    const name = prompt(ENTER_NAME, current.name);

    if (isNotDefined(name)) return;

    if (name.length === 0) {
      alert(ERR_EMPTY_STR);
      return controlAdd(id);
    }

    const childrenList = current.children;
    const newItem = {
      id: getUnId(),
      name,
    };

    current.children = childrenList ? [...childrenList, newItem] : [newItem];
    current.closed = false;

    controlRender();
  } catch (err) {
    treeView.renderError();
    console.error(err);
  }
};
