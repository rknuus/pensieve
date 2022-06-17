<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { stacks } from './stack-store.js';
  import { display } from '../helpers/display-store.js';
  import Card from '../Card/Card.svelte';
  import CardDropZone from '../Card/CardDropZone.svelte';

  export let id;

  let cards;

  const stack_offset_factor = 5;
  const dispatch = createEventDispatcher();

  console.assert(id, 'stack has no valid ID');

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
  }
</style>

<div class="stack">
  {#each cards as cardId, i}
    <Card id={cardId} parentId={id} topCard={i === cards.length - 1} draggable={true} --top="{i * stack_offset_factor}px" --left="{i * stack_offset_factor}px" />
  {/each}
  <CardDropZone parentId={id} showAlways="{cards.length === 0}" --top="{cards.length * stack_offset_factor}px" --left="{cards.length * stack_offset_factor}px" on:drop="{onDrop}" />
</div>