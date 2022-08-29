import { writable } from 'svelte/store';
import { addToStore, updateItemInStore, removeItemFromStore } from '../helpers/store-helpers.js';

const store = writable([
  {
    id: 'c0',
    renderedContent: '<p>demo card 1',
  },
  {
    id: 'c1',
    renderedContent: '<p>demo card 2',
  },
  {
    id: 'c5',
    renderedContent: '<p>demo card 6',
  },
  // OLD
  {
    id: 'cardA',
    renderedContent: '<p>Hello, card world</p>',
  },
  {
    id: 'cardB',
    renderedContent: '<p>Lorem card ipsum</p>',
  },
  {
    id: 'cardC',
    renderedContent: '<p>Lappi, mach d\'Auge uuf</p>',
  },
  // END OLD
  ]);

export const cards = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
  add: (item) => { addToStore(item, store); },
  update: (id, data) => { updateItemInStore(id, data, store); },
  remove: (id) => { removeItemFromStore(id, store); },
  // TEMPORARILY(KNR): the following code just demonstrates how it would be done:
  toggleSomeProperty: (id) => {
    store.update(items => {
      const index = items.findIndex(m => m.id === id);
      const updatedItem = items[index];
      updatedItem.propX = !updatedItem.propX;
      const updatedItems = [...items];
      updatedItems[index] = updatedItem;
      return updatedItems;
    });
  }
};