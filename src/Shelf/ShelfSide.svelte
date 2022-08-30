<script>
  import ShelfLabel from './ShelfLabel.svelte';
  import Stack from '../Stack/Stack.svelte';
  import ViewIn3D from '../helpers/ViewIn3D.svelte';
  import { createEventDispatcher } from 'svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { shelfs } from './shelf-store.js';

  export let id;
  export let top_px;
  export let left_px;
  export let width_px;
  export let height_px;

  console.assert(id, 'shelf-side has no valid ID');

  const sign_top_px = 20;
  const shelf_inbox_top_px = height_px - (1.5 * 112);  // TODO(KNR): take from a store, so that it can be changed dynamically
  const shelf_inbox_left_px = 10;
  const dispatch = createEventDispatcher();

  $: sign_width_px = width_px * 0.7;  // TODO(KNR): take from a store
  $: sign_height_px = height_px * 0.1;
  $: shelf = getShelf(id, $shelfs);

  function getShelf(id, items) {
    const shelf = items.find(i => i.id === id);
    console.assert(shelf, 'shelf with ID %s not found in shelf store', id);
    return shelf;
  }

  function onDoubleClick(event) {
    dispatch('openedShelf', id);
  }

</script>

<style>
  .shelf-side {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top_px);
    left: var(--left_px);
    width: var(--width_px);
    height: var(--height_px);
    transform-style: preserve-3d;

    background: #A87328;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.3);
    color: rgba(0,0,0,0.5);

    cursor: pointer;
  }
</style>

<ViewIn3D perspective="perspective(50cm)" rotateX="0deg" rotateY="2deg" transform_origin="top center">
  <!-- TODO(KNR): CONTINUE HERE: pass id in event data to identify the shelf being "opened" -->
  <div class="shelf-side" id={id} use:cssVariables={{top_px, left_px, width_px, height_px}} on:dblclick={onDoubleClick}>
    <ShelfLabel id="{id}.sign" text="{shelf.name}" top_px={sign_top_px} width_px={sign_width_px} height_px={sign_height_px} />
    <Stack id="{id}.inbox" top={shelf_inbox_top_px} left={shelf_inbox_left_px} />
  </div>
</ViewIn3D>