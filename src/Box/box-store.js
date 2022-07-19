import { writable } from 'svelte/store';
import { addToStore, updateItemInStore, removeItemFromStore } from '../helpers/store-helpers.js';

const store = writable([
    {
      id: 'boxA',
      cards: ['cardA'],
      flippedCards: ['cardB', 'cardC'],
    },
    {
      id: 'boxB',
      cards: ['cardB', 'cardC'],
      flippedCards: [],
    },
    {
      id: 'boxC',
      cards: [],
      flippedCards: [],
    },
  ]);

export const boxes = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
  add: (item) => { addToStore(item, store); },
  update: (id, data) => { updateItemInStore(id, data, store); },
  remove: (id) => { removeItemFromStore(id, store); },
  flipCardUp: (id) => {
    store.update(items => {
      const index = items.findIndex(m => m.id === id);
      const updatedItem = {...items[index]};
      updatedItem.cards.push(updatedItem.flippedCards.pop());
      const updatedItems = [...items];
      updatedItems[index] = updatedItem;
      return updatedItems;
    });
  },
  flipCardDown: (id) => {
    store.update(items => {
      const index = items.findIndex(m => m.id === id);
      const updatedItem = {...items[index]};
      updatedItem.flippedCards.push(updatedItem.cards.pop());
      const updatedItems = [...items];
      updatedItems[index] = updatedItem;
      return updatedItems;
    });
  }
};