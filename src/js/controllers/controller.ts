import * as model from "../model";
import { treeView, emptyListView } from "../views";
import {
  controlRender,
  controlAdd,
  controlRemove,
  controlToggle,
  controlEdit,
  controlAddFirst,
} from "./index";

export const init = (): void => {
  model.manageStorage();
  treeView.addRenderHandler(controlRender);
  emptyListView.addClickHandler(controlAddFirst);
  treeView.addClickHandler(controlAdd, controlRemove, controlEdit, controlToggle);
};

init();
