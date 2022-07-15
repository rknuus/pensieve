<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';
  import { positioning } from '../helpers/positioning-store.js';

  export let parentId;
  export let showAlways = false;

  console.assert(parentId, 'placeholder has no valid parent ID');

  let highlightDropZones = null;
  let sourceId = null;

  $: cardWidth = $positioning.card.width + 'px';
  $: cardHeight = $positioning.card.height + 'px';

  const unsubscribeDisplay = display.subscribe(data => {
    highlightDropZones = data.highlightDropZones;
    sourceId = data.sourceStackId;
  });

  onDestroy(() => {
    if (unsubscribeDisplay) {
      unsubscribeDisplay();
    }
  });
</script>

<style>
.placeholdercard {
  width: var(--cardWidth);
  height: var(--cardHeight);

  border-style: dotted;
  border-width: 1px;
}
</style>

{#if showAlways || (highlightDropZones && sourceId !== parentId)}
  <div class="placeholdercard" on:dragover|preventDefault on:drop|preventDefault use:cssVariables={{cardWidth, cardHeight}}>
  </div>
{/if}