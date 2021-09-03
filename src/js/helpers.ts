import { Category, FoundList } from "./types";

export const findListItem = (store: Category[], itemId: string): FoundList => {
  const result = {} as FoundList;

  const findObj = (list: Category[], result: FoundList): FoundList | void => {
    for (let i = 0; i < list.length; i++) {
      const current = list[i];
      const { id, children } = current;

      if (id === itemId) {
        result.list = list;
        result.idx = i;
        return result;
      }
      if (children && children.length) findObj(children, result);
    }
  };

  findObj(store, result);

  return result;
};

export const isNotDefined = <T>(value: T): value is T => value == null;

export const isZeroLength = <T extends { length: number }>(str: T): boolean =>
  str.length === 0;

export const getUnId = (): string => Math.random().toString(16).slice(2);

export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(err);
  }
};

export const getFromStorage = <T>(key: string): T | void => {
  try {
    const result = localStorage.getItem(key) as string;

    return JSON.parse(result);
  } catch (err) {
    return console.warn(err);
  }
};
