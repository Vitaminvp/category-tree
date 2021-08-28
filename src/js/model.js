import { STORAGE_KEY } from './config';

export let state = [
  {
    id: '1',
    name: '1 Category item',
  },
  {
    id: '2',
    name: '2 Category item',
    children: [
      {
        id: '3',
        name: '2-1 Category item',
        children: [
          {
            id: '7',
            name: '2-1-1 Category item',
          },
        ],
      },
      {
        id: '4',
        name: '2-2 Category item',
        children: [
          {
            id: '5',
            name: '2-2-1 Category item',
          },
          {
            id: '6',
            name: '2-2-2 Category item',
          },
        ],
      },
    ],
  },
  {
    id: '8',
    name: '3 Category item',
  },
];

const persistTree = function () {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const manageStorage = function () {
  const storage = localStorage.getItem(STORAGE_KEY);

  if (storage) state = JSON.parse(storage);

  window.addEventListener('beforeunload', persistTree);
};
