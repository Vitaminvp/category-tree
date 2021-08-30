import { getUnId, isNotDefined } from "../helpers";
import * as model from "../model";
import { CREATE, DEFAULT_NAME } from "../config";
import { treeView, modalView } from "../views";
import { controlRender } from "./controlRender";
import { Category } from "../types";

const addNewItem = (name: string): void => {
  if (isNotDefined(name)) return;

  const category = {
    id: getUnId(),
    name,
  } as Category;

  model.state.push(category);

  controlRender();
};

export const controlAddFirst = (): void => {
  try {
    modalView.showModalHandler({
      title: CREATE,
      defaultValue: DEFAULT_NAME,
      handler: addNewItem,
    });
  } catch (err) {
    treeView.renderError(err as string);
  }
};
