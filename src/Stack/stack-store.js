import { writable } from 'svelte/store';
import { addToStore, updateItemInStore, removeItemFromStore } from '../helpers/store-helpers.js';

const store = writable([
    {
      id: 'stackA',
      cards: ['cardA', 'cardB'],
    },
    {
      id: 'stackB',
      cards: ['cardC'],
    },
    {
      id: 'stackC',
      cards: [],
    },
  ]);

export const stacks = {
    subscribe: store.subscribe,
    unsubscribe: store.unsubscribe,
    add: (item) => { addToStore(item, store); },
    update: (id, data) => { updateItemInStore(id, data, store); },
    remove: (id) => { removeItemFromStore(id, store); },
};