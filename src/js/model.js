import { STORAGE_KEY } from './config';
import { getFromStorage, saveToStorage } from './helpers';

export let state = [
  {
    id: '0',
    name: 'root',
    children: [
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
    ],
  },
];

export const manageStorage = () => {
  const storage = getFromStorage(STORAGE_KEY);

  if (storage) state = storage;

  window.addEventListener('beforeunload', () => saveToStorage(STORAGE_KEY, state));
};
