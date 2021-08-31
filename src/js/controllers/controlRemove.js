import { findListItem } from '../helpers';
import * as model from '../model';
import { modalView, treeView } from '../views';
import { controlRender } from './controlRender';
import { YOU_SURE } from '../config';

const DEL_AMOUNT = 1;

export const controlRemove = function (id) {
  try {
    const { list, idx } = findListItem(model.state, id);

    modalView.showModalHandler({
      title: YOU_SURE,
      handler: deleteItem(list, idx),
      alert: true,
    });
  } catch (err) {
    treeView.renderError(err);
  }
};

export const deleteItem = (list, id) => () => {
  try {
    list.splice(id, DEL_AMOUNT);

    controlRender();
  } catch (err) {
    throw err;
  }
};
