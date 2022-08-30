import { writable } from 'svelte/store';
import { addToStore, updateItemInStore, removeItemFromStore } from '../helpers/store-helpers.js';

const store = writable([
  {
    id: 's0',
    name: 'non-fiction / IT shelf',
    boards: ['s0.b1', 's0.b2', 's0.b3'],
  },
  {
    id: 's1',
    name: 'non-fiction / non-IT shelf',
    boards: ['s1.b1', 's1.b2', 's1.b3'],
  },
  {
    id: 's2',
    name: 'fiction shelf',
    boards: ['s2.b1', 's2.b2', 's2.b3'],
  },
  {
    id: 's3',
    name: 'miscellaneous shelf',
    boards: ['s3.b1', 's3.b2'],
  },
  // OLD
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
  // END OLD
]);

export const shelfs = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
  add: (item) => { addToStore(item, store); },
  update: (id, data) => { updateItemInStore(id, data, store); },
  remove: (id) => { removeItemFromStore(id, store); },
};