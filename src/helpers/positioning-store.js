import { writable } from 'svelte/store';

const store = writable({
  card: {
    height: 112,
    width: 200,
  },
});

export const positioning = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
};