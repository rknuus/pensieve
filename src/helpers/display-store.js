import { writable } from 'svelte/store';

const displayStore = writable({
  highlightCardDropZones: false,
  cardSourceId: null,
  highlightBoxDropZones: false,
  boxSourceId: null,
});

export const display = {
  subscribe: displayStore.subscribe,
  unsubscribe: displayStore.unsubscribe,
  startDraggingCard: (sourceId) => {
    displayStore.update(data => {
      const updatedData = {...data};
      updatedData.highlightCardDropZones = true;
      updatedData.cardSourceId = sourceId;
      return updatedData;
    });
  },
  stopDraggingCard: () => {
    displayStore.update(data => {
      const updatedData = {...data};
      updatedData.highlightCardDropZones = false;
      updatedData.cardSourceId = null;
      return updatedData;
    });
  },
  startDraggingBox: (sourceId) => {
    displayStore.update(data => {
      const updatedData = {...data};
      updatedData.highlightBoxDropZones = true;
      updatedData.boxSourceId = sourceId;
      return updatedData;
    });
  },
  stopDraggingBox: () => {
    displayStore.update(data => {
      const updatedData = {...data};
      updatedData.highlightBoxDropZones = false;
      updatedData.boxSourceId = null;
      return updatedData;
    });
  },
};