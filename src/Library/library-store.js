import { writable } from 'svelte/store';

// Currently I'm not sure I want to support multiple libraries. To keep things simple start with 1.
const store = writable({
  name: 'non-fiction',
  shelfs: ['s0', 's1', 's2', 's3'],
});

export const library = {
  subscribe: store.subscribe,
  unsubscribe: store.unsubscribe,
};