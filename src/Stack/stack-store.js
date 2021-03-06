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

function moveCard(cardId, sourceId, targetId) {
  store.update(items => {
    const sourceIndex = items.findIndex(s => s.id === sourceId);
    console.assert(sourceIndex !== -1);
    const targetIndex = items.findIndex(s => s.id === targetId);
    console.assert(targetIndex !== -1);

    const updatedItems = [...items];
    console.assert(updatedItems[sourceIndex].cards.includes(cardId));
    console.assert(!updatedItems[targetIndex].cards.includes(cardId));
    updatedItems[sourceIndex].cards = updatedItems[sourceIndex].cards.filter(c => c !== cardId);
    updatedItems[targetIndex].cards.push(cardId);

    return updatedItems;
  });
}

export const stacks = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
  add: (item) => { addToStore(item, store); },
  update: (id, data) => { updateItemInStore(id, data, store); },
  remove: (id) => { removeItemFromStore(id, store); },
  moveCard: (cardId, sourceId, targetId) => { moveCard(cardId, sourceId, targetId); },
};