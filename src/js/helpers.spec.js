import { findListItem, getUnId, isNotDefined, isZeroLength } from './helpers';

describe('Helper functions:', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test('isNotDefined called with null', () => {
    const value = null;
    const result = isNotDefined(value);
    const expected = true;

    expect(result).toBe(expected);
  });

  test('isNotDefined called with undefined', () => {
    const value = undefined;
    const result = isNotDefined(value);
    const expected = true;

    expect(result).toBe(expected);
  });

  test('isNotDefined called with right argument', () => {
    const value = 'string';
    const result = isNotDefined(value);
    const expected = false;

    expect(result).toBe(expected);
  });

  test('isZeroLength called with not zero length string', () => {
    const value = 'string';
    const result = isZeroLength(value);
    const expected = false;

    expect(result).toBe(expected);
  });

  test('isZeroLength called with zero length string', () => {
    const value = '';
    const result = isZeroLength(value);
    const expected = true;

    expect(result).toBe(expected);
  });

  test('isZeroLength called with undefined', () => {
    const value = undefined;

    function expected() {
      isZeroLength(value);
    }

    expect(expected).toThrowError(new Error("Cannot read property 'length' of undefined"));
  });

  test('getUnId', () => {
    const value = undefined;

    const result = getUnId(value);
    const expected = '1f9add3739635f';

    expect(result).toEqual(expected);
  });

  test('findListItem called with right argument', () => {
    const store = [
      {
        id: '0',
        name: 'root',
        children: [
          {
            id: '1',
            name: 'child',
          },
        ],
      },
    ];

    const id = '1';

    const result = findListItem(store, id);
    const expected = { idx: 0, list: [{ id: '1', name: 'child' }] };

    expect(result).toEqual(expected);
  });
});

// export const findListItem = (store, itemId) => {
//   let result = {};
//
//   const findObj = (list, result) => {
//     for (let i = 0; i < list.length; i++) {
//       const current = list[i];
//       const { id, children } = current;
//
//       if (id === itemId) {
//         result.list = list;
//         result.idx = i;
//         return result;
//       }
//       if (children && children.length) findObj(children, result);
//     }
//   };
//
//   findObj(store, result);
//
//   return result;
// };
