import { getUnId, isNotDefined } from '../helpers';
import * as model from '../model';
import { ENTER_NAME, ERR_EMPTY_STR } from '../config';
import treeView from '../views/treeView';
import { controlRender } from './controlRender';

export const controlAddFirst = function () {
  try {
    const name = prompt(ENTER_NAME);

    if (isNotDefined(name)) return;

    if (name.length === 0) {
      alert(ERR_EMPTY_STR);
      return controlAddFirst();
    }

    const newItem = {
      id: getUnId(),
      name,
    };

    model.state.push(newItem);

    controlRender();
  } catch (err) {
    treeView.renderError();
    console.error(err);
  }
};
