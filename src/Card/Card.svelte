<script>
  import { cards } from './card-store.js';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';

  export let id;
  export let parentId;
  export let top;
  export let left;
  export let topCard;
  export let draggable;
  export let flipped = false;

  let renderedContent;

  const dispatch = createEventDispatcher();

  console.assert(id, 'card has no valid ID');
  console.assert(parentId, 'card has no valid parent ID');

  const unsubscribe = cards.subscribe(items => {
    const card = items.find(i => i.id === id);
    console.assert(card, 'card with ID %s not found in card store', id);
    renderedContent = card.renderedContent;
  });

  $: dragEnabled = draggable && topCard;

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function onDragStart(event) {
    // setting data is borrowed from https://svelte.dev/repl/b225504c9fea44b189ed5bfb566df6e6?version=3.48.0
    const data = {cardId: id, sourceId: parentId};
    event.dataTransfer.setData('text/plain', JSON.stringify(data));
    event.dataTransfer.effectAllowed = 'move';
    console.debug('starting to drag item ' + id + ' from source stack ' + parentId);
    // TODO(KNR): updating the store interrupts the drag operation
    display.startDragging(parentId);
  }

  function onDragEnd(event) {
    console.debug('stop dragging item ' + id);
    display.stopDragging();
    // Apparently we don't have to clear the transfer data
  }
</script>

<style>
/* TODO(KNR): alternatively we could set the background image dynamically and manage the background-line-dinstance variable in JS instead of CSS, see https://svelte.dev/repl/8123d474edb04f198c3b83363716a709?version=3.23.2 */
:root {
  --background-line-distance: 1.2rem;
}

.card {
  height: 112px;
  aspect-ratio: 1.7857;

  position: absolute;
  /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
  top: var(--top);
  left: var(--left);
  z-index: var(--zIndex);

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
    transform: rotateX(-180deg);
}
</style>

<div class="card" class:flipped="{flipped}" class:draggable="{dragEnabled}" draggable={dragEnabled} on:dragstart="{onDragStart}" on:dragend="{onDragEnd}" use:cssVariables={{top, left}}>
  {#if !flipped}
    {@html renderedContent}
  {/if}
</div>