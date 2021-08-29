import { manageStorage } from './model';

describe('model:', () => {
  test('manageStorage', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn();

    manageStorage();

    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
