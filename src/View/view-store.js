import { writable } from 'svelte/store';

const store = writable({
  current: 'library',
});

export const view = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
};