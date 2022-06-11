<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { cards } from './card-store.js';

    export let id;

    let renderedContent;

    const dispatch = createEventDispatcher();

    console.assert(id, 'card has no valid ID');

    const unsubscribe = cards.subscribe(items => {
        const card = items.find(i => i.id === id);
        console.assert(card, 'card with ID %s not found in card store', id);
        renderedContent = card.renderedContent;
    });

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });
</script>

<style>
:root {
    --background-line-distance: 1.2rem;
}

.card {
  height: 112px;
  aspect-ratio: 1.7857;

  position: absolute;
  /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
  top: var(--top);
  left: var(--left);

  /*padding: 5px;*/

  box-shadow: 1px 1px 3px rgba(0,0,0,.25);
  background-color: white;  /* prevent cards from being transparent */
  /* borrowed from https://codepen.io/teddyzetterlund/pen/YPjEzP */
  background-image:
    linear-gradient(180deg,
      white var(--background-line-distance),
      #F0A4A4 var(--background-line-distance),
      #F0A4A4 calc(var(--background-line-distance) + 1px),
      transparent 1px),
    repeating-linear-gradient(180deg,
      transparent,
      transparent var(--background-line-distance),
    #DDD 1px,
    #DDD calc(var(--background-line-distance) + 1px));

  overflow: hidden;  /* only show text within the card borders */
}
</style>

<div class="card">
    {@html renderedContent}
</div>