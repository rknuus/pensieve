import { writable } from 'svelte/store';
import { addToStore, updateItemInStore, removeItemFromStore } from '../helpers/store-helpers.js';

const store = writable([
    {
      id: 's0.b1',
      boxes: ['boxA', 'boxB', 'boxC'],
    },
    {
      id: 's0.b2',
      boxes: ['boxD', 'boxE'],
    },
    {
      id: 's0.b3',
      boxes: [],
    },
    {
      id: 's1.b1',
      boxes: ['boxF'],
    },
    {
      id: 's1.b2',
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