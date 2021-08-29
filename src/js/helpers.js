export const findListItem = (store, itemId) => {
  let result = {};

  const findObj = (list, result) => {
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

export const isNotDefined = value => value == null;

export const isZeroLength = str => str.length === 0;

export const getUnId = () => Math.random().toString(16).slice(2);

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(err);
  }
};

export const getFromStorage = key => {
  try {
    const result = localStorage.getItem(key);

    return JSON.parse(result);
  } catch (err) {
    console.warn(err);

    return null;
  }
};
