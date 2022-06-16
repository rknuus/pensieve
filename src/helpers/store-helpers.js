export function addToStore(item, store) {
  // TODO(KNR): use something like a GUID as ID
  item.id = Math.random().toString();
  return store.update(items => { return [...items, item]; });
}

export function updateItemInStore(id, data, store) {
  store.update(items => {
    const index = items.findIndex(m => m.id === id);
    const updatedItem = {...items[index], ...data};
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    return updatedItems;
  });
}

export function removeItemFromStore(id, store) {
  store.update(items => {
    return items.filter(i => i.id !== id);
  });
}