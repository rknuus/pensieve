<script>
  import Card from '../Card/Card.svelte';
  import CardDropZone from '../Card/CardDropZone.svelte';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';
  import { getHeight, getWidth  } from '../helpers/display-helpers.js';
  import { getStore } from '../helpers/stores.js';
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
    const cardId = eventData.cardId;
    const sourceStore = getStore(eventData.sourceStore);
    sourceStore.removeCard(cardId, eventData.sourceId);
    stacks.addCard(cardId, id);
    display.stopDragging();
    console.debug('dropped item ' + cardId + ' onto target stack ' + id);
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

    transform-style: preserve-3d;
    /* TODO(KNR): centralize perspective and origin in store */
    transform: perspective(50cm) rotateX(-2deg) rotateY(20deg);
    transform-origin: top center;
  }
</style>

<div class="stack" use:cssVariables={{top, left, width, height}}>
  {#each cards as cardId, i}
    <Card id={cardId} parentId={id} parentStoreType='stack' topCard={i === cards.length - 1} draggable={true} level={i} />
  {/each}
  <CardDropZone parentId={id} showAlways="{cards.length === 0}" level={cards.length} on:drop="{onDrop}" />
</div>