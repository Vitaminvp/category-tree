import * as model from '../model';
import { findListItem, isNotDefined } from '../helpers';
import { EDIT_ITEM } from '../config';
import { treeView, modalView } from '../views';

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
  try {
    if (isNotDefined(name)) return;

    currentItem.name = name;

    treeView.update(model.state);
  } catch (err) {
    throw err;
  }
};
