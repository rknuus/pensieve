import { writable } from 'svelte/store';

const store = writable({
  current: 'library',  // TODO(KNR): consider to stack selected items to allow back navigation
  selected: null,  // TODO(KNR): consider to stack selected items to allow back navigation
});

function enter(newView, selected) {
  store.update(items => {
    const updatedItems = items;
    updatedItems.current = newView;
    updatedItems.selected = selected;
    return updatedItems;
  });
}

function leave() {
  store.update(items => {
    const updatedItems = items;
    updatedItems.current = 'library';
    updatedItems.selected = null;
    return updatedItems;
  });
}

export const view = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
  enter: (newView, selected) => { enter(newView, selected); },
  leave: () => { leave(); },
};