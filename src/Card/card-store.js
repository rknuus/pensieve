import { writable } from 'svelte/store';

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
    add: (item) => {
        // TODO(KNR): use something like a GUID as ID
        item.id = Math.random().toString();
        return meetups.update(items => {
            return [...items, item];
        });
    },
    update: (id, data) => {
        store.update(items => {
            const index = items.findIndex(m => m.id === id);
            const updatedItem = {...items[index], ...data};
            const updatedItems = [...items];
            updatedItems[index] = updatedItem;
            return updatedItems;
        });
    },
    remove: (id) => {
        store.update(items => {
            return items.filter(i => i.id !== id);
        });
    },
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