import { writable } from 'svelte/store';
import { addToStore, updateItemInStore, removeItemFromStore } from '../helpers/store-helpers.js';

const store = writable([
    {
      id: 'shelfA',
      boards: ['shelfA.1', 'shelfA.2', 'shelfA.3'],
    },
    {
      id: 'shelfB',
      boards: ['shelfB.1', 'shelfB.2'],
    },
    {
      id: 'shelfC',
      boards: [],
    },
  ]);

export const shelfs = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
  add: (item) => { addToStore(item, store); },
  update: (id, data) => { updateItemInStore(id, data, store); },
  remove: (id) => { removeItemFromStore(id, store); },
};