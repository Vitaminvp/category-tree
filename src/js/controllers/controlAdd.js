import { findListItem, getUnId, isNotDefined } from '../helpers';
import * as model from '../model';
import { ADD_ITEM } from '../config';
import treeView from '../views/treeView';
import { controlRender } from './controlRender';
import modalView from '../views/modalView';

export const controlAdd = function (id) {
  try {
    const { list, idx } = findListItem(model.state, id);
    const current = list[idx];

    modalView.showModalHandler({
      title: ADD_ITEM,
      defaultValue: current.name,
      handler: addItem(current),
    });
  } catch (err) {
    treeView.renderError(err);
  }
};

const addItem = currentItem => name => {
  if (isNotDefined(name)) return;

  const childrenList = currentItem.children;
  const newItem = {
    id: getUnId(),
    name,
  };

  currentItem.children = childrenList ? [...childrenList, newItem] : [newItem];
  currentItem.closed = false;

  controlRender();
};
