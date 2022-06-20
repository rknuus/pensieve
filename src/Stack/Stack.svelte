<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { stacks } from './stack-store.js';
  import { display } from '../helpers/display-store.js';
  import Card from '../Card/Card.svelte';
  import CardDropZone from '../Card/CardDropZone.svelte';

  export let id;

  let cards;

  $: width = getWidth(cards);
  $: height = getHeight(cards);

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

  function getCardOffset(stackLevel) {
    return stackLevel * stack_offset_factor;
  }

  function getHeight(cards) {
    if (cards.length === 0) {
      return 0;
    }
    // TODO(KNR): should we move card size to the display-store?!
    const cardHeight = 112;
    return cardHeight + getCardOffset(cards.length);
  }

  function getWidth(cards) {
    if (cards.length === 0) {
      return 0;
    }
    // TODO(KNR): should we move card size to the display-store?!
    const cardHeight = 200;
    return cardHeight + getCardOffset(cards.length);
  }

  // exposing height as CSS variable is borrowed from https://svelte.dev/repl/14a1b548093642a9a2dfb3e615382732?version=3.48.0
  function setCssHeight(node) {
    node.style.setProperty(`--height`, height);
  }

  function setCssWidth(node) {
    node.style.setProperty(`--width`, width);
  }
</script>

<style>
  .stack {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top);
    left: var(--left);
    width: calc(var(--width) * 1px);
    height:  calc(var(--height) * 1px);
  }
</style>

<div class="stack" use:setCssHeight use:setCssWidth>
  {#each cards as cardId, i}
    <Card id={cardId} parentId={id} topCard={i === cards.length - 1} draggable={true} --top="{getCardOffset(i)}px" --left="{getCardOffset(i)}px" />
  {/each}
  <CardDropZone parentId={id} showAlways="{cards.length === 0}" --top="{getCardOffset(cards.length)}px" --left="{getCardOffset(cards.length)}px" on:drop="{onDrop}" />
</div>