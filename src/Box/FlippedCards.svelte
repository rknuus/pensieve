<script>
  import Card from '../Card/Card.svelte';
  import { boxes } from './box-store.js';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { positioning } from '../helpers/positioning-store.js';

  export let id;
  export let top;
  export let left;

  // console.assert(Number.isInteger(top));  // TODO(KNR): fix and reactivate
  console.assert(Number.isInteger(left));

  let cards;

  const dispatch = createEventDispatcher();

  console.assert(id, 'flipped cards has no valid ID');

  const unsubscribeBoxes = boxes.subscribe(items => {
    const box = items.find(i => i.id === id);
    console.assert(box, 'flipped cards with ID %s not found in box store', id);
    cards = box.flippedCards;
  });

  onDestroy(() => {
    if (unsubscribeBoxes) {
      unsubscribeBoxes();
    }
  });
</script>

<style>
  .flippedcards {
    transform-style: preserve-3d;
  }
</style>

<div class="flippedcards" use:cssVariables={{top, left}}>
  {#each cards as cardId, i}
    <Card id={cardId} parentId={id} topCard={i === cards.length - 1} flipped={true} level={i} />
  {/each}
</div>
