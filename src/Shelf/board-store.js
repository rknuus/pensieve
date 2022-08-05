import { writable } from 'svelte/store';
import { addToStore, updateItemInStore, removeItemFromStore } from '../helpers/store-helpers.js';

const store = writable([
    {
      id: 'shelfA.1',
      boxes: ['boxA', 'boxB', 'boxC'],
    },
    {
      id: 'shelfA.2',
      boxes: ['boxD', 'boxE'],
    },
    {
      id: 'shelfA.3',
      boxes: [],
    },
    {
      id: 'shelfB.1',
      boxes: ['boxF'],
    },
    {
      id: 'shelfB.2',
      boxes: ['boxG', 'boxH', 'boxI', 'boxJ', 'boxK'],
    },
  ]);

export const boards = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
  add: (item) => { addToStore(item, store); },
  update: (id, data) => { updateItemInStore(id, data, store); },
  remove: (id) => { removeItemFromStore(id, store); },
};