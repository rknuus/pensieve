<script>
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';
  import { positioning } from '../helpers/positioning-store.js';

  export let parentId;
  export let level;
  export let showAlways = false;

  console.assert(parentId, 'placeholder has no valid parent ID');

  $: cardWidth = $positioning.card.width;
  $: cardHeight = $positioning.card.height;
  $: zShift = (level * $positioning.zShiftFactor);
  $: highlightCardDropZones = $display.highlightCardDropZones;
  $: sourceId = $display.cardSourceId;
</script>

<style>
.placeholdercard {
  width: var(--cardWidth);
  height: var(--cardHeight);

  position: absolute;

  transform: translateZ(var(--zShift));

  border-style: dotted;
  border-width: 1px;
}
</style>

{#if showAlways || (highlightCardDropZones && sourceId !== parentId)}
  <div class="placeholdercard" on:dragover|preventDefault on:drop|preventDefault use:cssVariables={{zShift, cardWidth, cardHeight}}>
  </div>
{/if}