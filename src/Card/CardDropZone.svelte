<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { display } from '../helpers/display-store.js';

  export let parentId;
  export let showAlways = false;

  let highlightDropZones = null;
  let sourceId = null;

  console.assert(parentId, 'placeholder has no valid parent ID');

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
  height: 112px;
  aspect-ratio: 1.7857;
  /*width: 200px;*/

  position: absolute;
  /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
  top: var(--top);
  left: var(--left);

  border-style: dotted;
  border-width: 1px;
}
</style>

{#if showAlways || (highlightDropZones && sourceId !== parentId)}
  <div class="placeholdercard" on:dragover|preventDefault on:drop|preventDefault>
  </div>
{/if}