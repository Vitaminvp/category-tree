import * as model from '../model';
import { findListItem, isNotDefined } from '../helpers';
import { EDIT_ITEM } from '../config';
import treeView from '../views/treeView';
import { controlRender } from './controlRender';
import modalView from '../views/modalView';

export const controlEdit = function (id) {
  try {
    const { list, idx } = findListItem(model.state, id);
    const current = list[idx];

    modalView.showModalHandler({
      title: EDIT_ITEM,
      defaultValue: current.name,
      handler: editItem(current),
    });
  } catch (err) {
    treeView.renderError(err);
  }
};

const editItem = currentItem => name => {
  if (isNotDefined(name)) return;

  currentItem.name = name;

  controlRender();
};
