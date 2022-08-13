<script>
  import { cards } from './card-store.js';
  import { onDestroy } from 'svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';
  import { positioning } from '../helpers/positioning-store.js';

  export let id;
  export let parentId;
  export let parentStoreType;
  export let topCard;
  export let draggable;
  export let level;
  export let flipped = false;

  console.assert(Number.isInteger(level));

  let renderedContent;

  console.assert(id, 'card has no valid ID');
  console.assert(parentId, 'card has no valid parent ID');

  const unsubscribe = cards.subscribe(items => {
    const card = items.find(i => i.id === id);
    console.assert(card, 'card with ID %s not found in card store', id);
    renderedContent = card.renderedContent;
  });

  $: cardWidth = $positioning.card.width;
  $: cardHeight = $positioning.card.height;
  $: zShift = (level * $positioning.zShiftFactor);
  $: dragEnabled = draggable && topCard;

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function onDragStart(event) {
    // setting data is borrowed from https://svelte.dev/repl/b225504c9fea44b189ed5bfb566df6e6?version=3.48.0
    // TODO(KNR): do we sill need parentId?
    const data = {cardId: id, sourceId: parentId, sourceStore: parentStoreType};
    event.dataTransfer.setData('text/plain', JSON.stringify(data));
    event.dataTransfer.effectAllowed = 'move';
    console.debug('starting to drag card ' + id + ' from source stack ' + parentId);
    display.startDraggingCard(parentId);
  }

  function onDragEnd(event) {
    console.debug('stop dragging card ' + id);
    display.stopDraggingCard();
    // Apparently we don't have to clear the transfer data
  }
</script>

<style>
/* TODO(KNR): alternatively we could set the background image dynamically and manage the background-line-dinstance variable in JS instead of CSS, see https://svelte.dev/repl/8123d474edb04f198c3b83363716a709?version=3.23.2 */
:root {
  --background-line-distance: 1.2rem;
}

.card {
  width: var(--cardWidth);
  height: var(--cardHeight);

  position: absolute;
  transform: translateZ(var(--zShift));

  box-shadow: 1px 1px 3px rgba(0,0,0,.25);
  background-color: white;  /* avoid cards being transparent */
  /* borrowed from https://codepen.io/teddyzetterlund/pen/YPjEzP */
  background-image:
  linear-gradient(180deg,
    white var(--background-line-distance),
    #F0A4A4 var(--background-line-distance),
    #F0A4A4 calc(var(--background-line-distance) + 1px),
    transparent 1px),
  repeating-linear-gradient(180deg,
    transparent,
    transparent var(--background-line-distance),
  #DDD 1px,
  #DDD calc(var(--background-line-distance) + 1px));

  overflow: hidden;  /* only show text within the card borders unless the card is unfolded by JS */
}

.draggable {
  cursor: move;
}

.flipped {
  transform: rotateX(-180deg) translateY(calc(-1 * var(--cardHeight))) translateZ(calc(-1 * var(--zShift)));
}
</style>

<div class="card" class:flipped="{flipped}" class:draggable="{dragEnabled}" draggable={dragEnabled} on:dragstart="{onDragStart}" on:dragend="{onDragEnd}" use:cssVariables={{zShift, cardWidth, cardHeight}}>
  {#if !flipped}
    {@html renderedContent}
  {/if}
</div>