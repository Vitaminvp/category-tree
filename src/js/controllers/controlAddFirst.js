import { getUnId, isNotDefined } from '../helpers';
import * as model from '../model';
import { CREATE, DEFAULT_NAME } from '../config';
import { treeView, modalView } from '../views';
import { controlRender } from './controlRender';

export const controlAddFirst = function () {
  try {
    modalView.showModalHandler({
      title: CREATE,
      defaultValue: DEFAULT_NAME,
      handler: addNewItem,
    });
  } catch (err) {
    treeView.renderError(err);
  }
};

const addNewItem = name => {
  try {
    if (isNotDefined(name)) return;

    const category = {
      id: getUnId(),
      name,
    };

    model.state.push(category);

    controlRender();
  } catch (err) {
    throw err;
  }
};
