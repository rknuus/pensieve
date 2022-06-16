// import { tick } from 'svelte';
import { writable } from 'svelte/store';

const displayStore = writable({
  highlightDropZones: false,
  sourceStackId: null,
});

export const display = {
  subscribe: displayStore.subscribe,
  unsubscribe: displayStore.unsubscribe,
  startDragging: (sourceId) => {
    displayStore.update(data => {
      const updatedData = {...data};
      updatedData.highlightDropZones = true;
      updatedData.sourceStackId = sourceId;
      return updatedData;
    });
  },
  stopDragging: () => {
    displayStore.update(data => {
      const updatedData = {...data};
      updatedData.highlightDropZones = false;
      updatedData.sourceStackId = null;
      return updatedData;
    });
  },
};