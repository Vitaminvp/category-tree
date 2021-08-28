import * as model from '../model';
import treeView from '../views/treeView';
import emptyListView from '../views/emptyListView';
import { controlRender } from './controlRender';
import { controlAdd } from './controlAdd';
import { controlRemove } from './controlRemove';
import { controlToggle } from './controlToggle';
import { controlEdit } from './controlEdit';
import { controlAddFirst } from './controlAddFirst';

if (module.hot) {
  module.hot.accept();
}

const init = function () {
  model.manageStorage();

  treeView.addRenderHandler(controlRender);
  emptyListView.addClickHandler(controlAddFirst);
  treeView.addClickHandler(controlAdd, controlRemove, controlEdit, controlToggle);
};

init();
