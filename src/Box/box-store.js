import { writable } from 'svelte/store';
import { addToStore, updateItemInStore, removeItemFromStore } from '../helpers/store-helpers.js';

const store = writable([
    {
      id: 'boxA',
      name: 'Refactoring',
      cards: ['cardA'],
      flippedCards: ['cardB', 'cardC'],
    },
    {
      id: 'boxB',
      name: 'JavaScript',
      cards: ['cardB', 'cardC'],
      flippedCards: [],
    },
    {
      id: 'boxC',
      name: 'TypeScript',
      cards: [],
      flippedCards: [],
    },
    {
      id: 'boxD',
      name: 'DDD',
      cards: [],
      flippedCards: [],
    },
    {
      id: 'boxE',
      name: 'C++',
      cards: [],
      flippedCards: [],
    },
    {
      id: 'boxF',
      name: 'Carbon',
      cards: [],
      flippedCards: [],
    },
    {
      id: 'boxG',
      name: 'Rust',
      cards: [],
      flippedCards: [],
    },
    {
      id: 'boxH',
      name: 'Julia',
      cards: [],
      flippedCards: [],
    },
    {
      id: 'boxI',
      name: 'Testing',
      cards: [],
      flippedCards: [],
    },
    {
      id: 'boxJ',
      name: 'Zettelkasten method',
      cards: [],
      flippedCards: [],
    },
    {
      id: 'boxK',
      name: 'Bird watching',
      cards: [],
      flippedCards: [],
    },
    {
      id: 'boxKappa',
      name: 'History 21st century',
      cards: ['cardA'],
      flippedCards: ['cardC'],
    },
  ]);

function addCard(cardId, targetId) {
  // by convention we only add cards to the open stack
  store.update(items => {
    const targetIndex = items.findIndex(s => s.id === targetId);
    console.assert(targetIndex !== -1);

    const updatedItems = [...items];
    console.assert(!updatedItems[targetIndex].cards.includes(cardId));
    updatedItems[targetIndex].cards.push(cardId);

    return updatedItems;
  });
}

function removeCard(cardId, sourceId) {
  // by convention we only remove cards from the open stack
  store.update(items => {
    const sourceIndex = items.findIndex(s => s.id === sourceId);
    console.assert(sourceIndex !== -1);

    const updatedItems = [...items];
    console.assert(updatedItems[sourceIndex].cards.includes(cardId));
    updatedItems[sourceIndex].cards = updatedItems[sourceIndex].cards.filter(c => c !== cardId);

    return updatedItems;
  });
}

function flipCardUp(id) {
  store.update(items => {
    const index = items.findIndex(m => m.id === id);
    const updatedItem = {...items[index]};
    updatedItem.cards.push(updatedItem.flippedCards.pop());
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    return updatedItems;
  });
}

function flipCardDown(id) {
  store.update(items => {
    const index = items.findIndex(m => m.id === id);
    const updatedItem = {...items[index]};
    updatedItem.flippedCards.push(updatedItem.cards.pop());
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    return updatedItems;
  });
}

export const boxes = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
  add: (item) => { addToStore(item, store); },
  update: (id, data) => { updateItemInStore(id, data, store); },
  remove: (id) => { removeItemFromStore(id, store); },
  flipCardUp: (id) => { flipCardUp(id); },
  flipCardDown: (id) => { flipCardDown(id); },
  addCard: (cardId, targetId) => { addCard(cardId, targetId); },
  removeCard: (cardId, sourceId) => { removeCard(cardId, sourceId); },
};