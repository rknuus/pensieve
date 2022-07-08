<script>
  import Card from '../Card/Card.svelte';
  import { boxes } from './box-store.js';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { positioning } from '../helpers/positioning-store.js';

  export let id;
  export let top;
  export let left;

  let cards;

  $: cardHeight = $positioning.card.height + 'px';

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
    position: absolute;
  }
</style>

<div class="flippedcards" use:cssVariables={{top, left}}>
  {#each cards as cardId, i}
    <Card id={cardId} parentId={id} topCard={i === cards.length - 1} flipped={true} level={i} />
  {/each}
</div>
