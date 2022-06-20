<script>
  import FlippedCards from './FlippedCards.svelte';
  import OpenCards from './OpenCards.svelte';
  import { boxes } from './box-store.js';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';
  import { getCardOffset, getHeight, getWidth  } from '../helpers/display-helpers.js';
  import { onDestroy } from 'svelte';

  export let id;
  export let top;
  export let left;
  export let selected = false;

  let openCards;
  let flippedCards;

  $: allCards = openCards.concat(flippedCards);
  $: width = getWidth(allCards);
  $: height = 2 * getHeight(allCards);
  $: lowerTop = parseInt(top) + getHeight(allCards) + getCardOffset(allCards.length);

  // TEMPORARILY(KNR)
  $: console.log('lowerTop of ' + id + ': ' + lowerTop);
  // END TEMPORARILY(KNR)

  console.assert(id, 'box has no valid ID');

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
</style>

<div class="box" use:cssVariables={{top, left, height, width}}>
  <OpenCards id="{id}" top="{top}" left="{left}" />
  <FlippedCards id="{id}" top="{lowerTop}" left="{left}" />
</div>