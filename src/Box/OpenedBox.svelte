<script>
  import FlippedCards from './FlippedCards.svelte';
  import OpenCards from './OpenCards.svelte';
  import OpenedBoxWalls from './OpenedBoxWalls.svelte';
  import { boxes } from './box-store.js';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';
  import { getCardOffset, getHeight  } from '../helpers/display-helpers.js';
  import { getStore } from '../helpers/stores.js';
  import { stacks } from '../Stack/stack-store.js';  // TODO(KNR): in OO this dependency would be a no-no

  export let id;
  export let top;
  export let left;
  export let selected;

  console.assert(Number.isInteger(top));
  console.assert(Number.isInteger(left));

  let openCards;
  let flippedCards;

  $: allCards = openCards.concat(flippedCards);
  $: lowerTop = top + getHeight(allCards) + getCardOffset(allCards.length);

  console.assert(id, 'box has no valid ID');

  const dispatch = createEventDispatcher();

  const unsubscribeBoxes = boxes.subscribe(items => {
    const box = items.find(i => i.id === id);
    console.assert(box, 'flipped cards with ID %s not found in box store', id);
    openCards = box.cards;
    flippedCards = box.flippedCards;
  });

  onDestroy(() => {
    if (unsubscribeBoxes) {
      unsubscribeBoxes();
    }
  });

  function onDoubleclick(event) {
    dispatch('selected', id);
  }

  function onKeyDown(e) {
    if (selected) {
      console.log('box ' + id + ' got key ' + e.keyCode);
      switch (e.keyCode) {
        case 37:  // left
          flipCardUp();
          break;
        case 39:  // right
          flipCardDown();
          break;
        case 38:  // up
          flipCardUp();
          break;
        case 40:  // down
          flipCardDown();
          break;
      }
    }
  }

  function flipCardUp() {
    if (flippedCards.length > 0) {
      boxes.flipCardUp(id);
    }
  }

  function flipCardDown() {
    if (openCards.length > 0) {
      boxes.flipCardDown(id);
    }
  }

  function onDrop(e) {
    // TODO(KNR): apart from the target store this function is identical to onDrop of Stack
    // getting data is borrowed from https://svelte.dev/repl/b225504c9fea44b189ed5bfb566df6e6?version=3.48.0
    const json = event.dataTransfer.getData("text/plain");
    const eventData = JSON.parse(json);
    const cardId = eventData.cardId;
    const sourceStore = getStore(eventData.sourceStore);
    sourceStore.removeCard(cardId, eventData.sourceId);
    boxes.addCard(cardId, id);
    display.stopDraggingCard();
    console.debug('dropped item ' + cardId + ' onto target box ' + id);
  }
</script>

<style>
  .box {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top);
    left: var(--left);
    transform-style: preserve-3d;
  }
</style>

<div class="box" use:cssVariables={{top, left}} on:dblclick="{onDoubleclick}">
  <OpenCards id="{id}" top={top} left={left} on:drop="{onDrop}" />
  <FlippedCards id="{id}" top={lowerTop} left={left} />
  <OpenedBoxWalls selected={selected} top={getHeight(allCards)} left={0} cardCount={allCards.length} />
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />