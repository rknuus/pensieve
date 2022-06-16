<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { stacks } from './stack-store.js';
  import Card from '../Card/Card.svelte';
  import PlaceholderCard from '../Card/PlaceholderCard.svelte';

  export let id;

  let cards;

  const stack_offset_factor = 5;
  const dispatch = createEventDispatcher();

  console.assert(id, 'stack has no valid ID');

  const unsubscribeStacks = stacks.subscribe(items => {
    const stack = items.find(i => i.id === id);
    cards = stack.cards;
    console.assert(stack, 'stack with ID %s not found in stack store', id);
  });

  onDestroy(() => {
    if (unsubscribeStacks) {
      unsubscribeStacks();
    }
  });
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
    <!-- TODO(KNR): because the condition depends on the loop variable, I don't know how to factor it out into a function or a $: expression -->
    <Card id={cardId} parentId={id} --top="{i * stack_offset_factor}px" --left="{i * stack_offset_factor}px" />
  {/each}
  <PlaceholderCard parentId={id} showAlways="{cards.length === 0}" --top="{cards.length * stack_offset_factor}px" --left="{cards.length * stack_offset_factor}px" />
</div>