<script>
  import Card from '../Card/Card.svelte';
  import { boxes } from './box-store.js';
  import { createEventDispatcher, onDestroy } from 'svelte';

  export let id;

  let cards;

  const dispatch = createEventDispatcher();

  console.assert(id, 'open cards has no valid ID');

  const unsubscribeBoxes = boxes.subscribe(items => {
    const box = items.find(i => i.id === id);
    console.assert(box, 'open cards with ID %s not found in box store', id);
    cards = box.cards;
  });

  onDestroy(() => {
    if (unsubscribeBoxes) {
      unsubscribeBoxes();
    }
  });
</script>

<style>
</style>

<div class="opencards">
  {#each cards as cardId, i}
    <Card id={cardId} parentId={id} topCard={i === cards.length - 1} level={cards.length - i} />
  {/each}
</div>
