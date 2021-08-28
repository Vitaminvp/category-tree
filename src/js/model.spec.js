// export const manageStorage = function () {
//   const storage = localStorage.getItem(STORAGE_KEY);
//
//   if (storage) state = JSON.parse(storage);
//
//   window.addEventListener('beforeunload', persistTree);
// };

import { persistTree, manageStorage } from './model';

describe('model:', () => {
  test('persistTree', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    window.localStorage.__proto__.setItem = jest.fn();

    persistTree();

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('manageStorage', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn();

    manageStorage();

    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
