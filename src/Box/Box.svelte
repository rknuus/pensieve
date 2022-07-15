<script>
  import FlippedCards from './FlippedCards.svelte';
  import OpenCards from './OpenCards.svelte';
  import OpenedBoxWalls from './OpenedBoxWalls.svelte';
  import { boxes } from './box-store.js';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';
  import { getCardOffset, getHeight, getWidth  } from '../helpers/display-helpers.js';
  import { createEventDispatcher, onDestroy } from 'svelte';

  export let id;
  export let top;
  export let left;
  export let selected;

  let openCards;
  let flippedCards;

  $: allCards = openCards.concat(flippedCards);
  $: width = getWidth(allCards);
  $: height = getHeight(allCards) + getHeight(1);
  $: lowerTop = parseInt(top) + getHeight(allCards) + getCardOffset(allCards.length);
  $: totalOffset = getCardOffset(allCards.length) + getCardOffset(1);  // add one card for the single-card case

  // TEMPORARILY(KNR)
  $: console.log('lowerTop of ' + id + ': ' + lowerTop);
  // END TEMPORARILY(KNR)

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
</script>

<style>
  .box {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top);
    left: var(--left);
    height: var(--height);
    width: var(--width);
  }

  .selected {
    /* borrowed from https://stackoverflow.com/questions/4561097/css-box-shadow-bottom-only */
    box-shadow: 0 4px 2px -2px gray;
  }
</style>

<div class="box" class:selected use:cssVariables={{top, left, height, width}} on:dblclick="{onDoubleclick}">
  <OpenCards id="{id}" top="{top}" left="{left}" />
  <!-- TODO(KNR): the flipped cards are not shown -->
  <FlippedCards id="{id}" top="{lowerTop}" left="{left}" />
  <OpenedBoxWalls top="{getHeight(allCards)}" left="0" cardCount="{allCards.length}" />
</div>