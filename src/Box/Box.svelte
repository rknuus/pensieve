<script>
  import FlippedCards from './FlippedCards.svelte';
  import OpenCards from './OpenCards.svelte';
  import OpenedBoxWalls from './OpenedBoxWalls.svelte';
  import { boxes } from './box-store.js';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { getCardOffset, getHeight  } from '../helpers/display-helpers.js';
  import { createEventDispatcher, onDestroy } from 'svelte';

  export let id;
  export let top;
  export let left;
  export let selected;

  let openCards;
  let flippedCards;

  $: allCards = openCards.concat(flippedCards);
  $: lowerTop = parseInt(top) + getHeight(allCards) + getCardOffset(allCards.length);

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
</script>

<style>
  .box {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top);
    left: var(--left);

    transform-style: preserve-3d;
    transform: perspective(50cm) rotateX(-2deg) rotateY(20deg);
    transform-origin: top center;
  }
</style>

<div class="box" use:cssVariables={{top, left}} on:dblclick="{onDoubleclick}">
  <OpenCards id="{id}" top="{top}" left="{left}" />
  <FlippedCards id="{id}" top="{lowerTop}" left="{left}" />
  <OpenedBoxWalls selected={selected} top="{getHeight(allCards)}" left="0" cardCount="{allCards.length}" />
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />