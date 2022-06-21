<script>
  import Card from '../Card/Card.svelte';
  import CardDropZone from '../Card/CardDropZone.svelte';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';
  import { getCardOffset, getHeight, getWidth  } from '../helpers/display-helpers.js';
  import { stacks } from './stack-store.js';

  export let id;
  export let top;
  export let left;

  let cards;

  $: width = getWidth(cards);
  $: height = getHeight(cards);

  console.assert(id, 'stack has no valid ID');

  const dispatch = createEventDispatcher();

  const unsubscribeStacks = stacks.subscribe(items => {
    const stack = items.find(i => i.id === id);
    console.assert(stack, 'stack with ID %s not found in stack store', id);
    cards = stack.cards;
  });

  onDestroy(() => {
    if (unsubscribeStacks) {
      unsubscribeStacks();
    }
  });

  function onDrop(event) {
    // getting data is borrowed from https://svelte.dev/repl/b225504c9fea44b189ed5bfb566df6e6?version=3.48.0
    const json = event.dataTransfer.getData("text/plain");
    const eventData = JSON.parse(json);
    stacks.moveCard(eventData.cardId, eventData.sourceId, id);
    display.stopDragging();
    console.debug('dropped item ' + eventData.cardId + ' onto target stack ' + id);
  }
</script>

<style>
  .stack {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top);
    left: var(--left);
    height: var(--height);
    width: var(--width);
  }
</style>

<div class="stack" use:cssVariables={{top, left, width, height}}>
  {#each cards as cardId, i}
    <!-- TODO(KNR): I expect we have to add top to the card offset, but that's apparently wrong. Why?! -->
    <Card id={cardId} parentId={id} topCard={i === cards.length - 1} draggable={true} top="{getCardOffset(i)}" left="{getCardOffset(i)}" />
  {/each}
  <CardDropZone parentId={id} showAlways="{cards.length === 0}" --top="{getCardOffset(cards.length)}px" --left="{getCardOffset(cards.length)}px" on:drop="{onDrop}" />
</div>