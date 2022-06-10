import { writable } from 'svelte/store';
import { addToStore, updateItemInStore, removeItemFromStore } from '../helpers/store-helpers.js';

const store = writable([
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