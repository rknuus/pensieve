<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { boxes } from './box-store.js';
  import Card from '../Card/Card.svelte';

  export let id;

  let cards;

  const stack_offset_factor = 5;
  const dispatch = createEventDispatcher();

  console.assert(id, 'open cards has no valid ID');

  const unsubscribeBoxes = boxes.subscribe(items => {
    const box = items.find(i => i.id === id);
    console.assert(box, 'open cards with ID %s not found in box store', id);
    cards = box.cards;
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
  }
</style>

<div>
  {#each cards as cardId, i}
    <Card id={cardId} parentId={id} topCard={i === cards.length - 1} --top="{i * stack_offset_factor}px" --left="{i * stack_offset_factor}px" />
  {/each}
</div>