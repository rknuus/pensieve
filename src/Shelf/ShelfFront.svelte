<script>
  import ShelfBoard from './ShelfBoard.svelte';
  import ShelfLabel from './ShelfLabel.svelte';
  import ShelfSideBoard from './ShelfSideBoard.svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { onDestroy } from 'svelte';
  import { shelfs } from './shelf-store.js';

  export let id;
  export let boardCount;
  export let boxesPerBoard;
  export let top_px = 0;
  export let left_px = 0;
  export let width_px;
  export let height_px;
  export let thickness_px;
  export let boardDistance_px;
  export let boardDepth_px;

  let name;
  let boards;

  const sign_top_px = 0;

  $: sign_width_px = 154;  // boardDepth_px * 0.7;
  $: sign_height_px = 60;  // height_px * 0.1;

  console.assert(Number.isInteger(boardCount));
  console.assert(Number.isInteger(boxesPerBoard));
  console.assert(Number.isInteger(top_px));
  console.assert(Number.isInteger(left_px));
  console.assert(Number.isInteger(width_px));
  console.assert(Number.isInteger(height_px));
  console.assert(Number.isInteger(thickness_px));
  console.assert(Number.isInteger(boardDistance_px));
  console.assert(Number.isInteger(boardDepth_px));

  const unsubscribeShelfs = shelfs.subscribe(items => {
    const shelf = items.find(i => i.id === id);
    console.assert(shelf, 'shelf with ID %s not found in shelf store', id);
    name = shelf.name;
    boards = shelf.boards;

    console.assert(boards.length > 0, 'shelf with ID %s has less than 1 boards', id);
    console.assert(boards.length <= boardCount, 'shelf with ID %s has %d boards, which is more than the expected %d', id, boards.length, boardCount);
    // height_px = Math.max(1, boards.length) * boardDistance_px;
  });

  onDestroy(() => {
    if (unsubscribeShelfs) {
      unsubscribeShelfs();
    }
  });
</script>

<style>
  .shelf {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top_px);
    left: var(--left_px);
    width: var(--width_px);
    height: var(--height_px);
    transform-style: preserve-3d;
  }
</style>

<div class="shelf" id="{id}" use:cssVariables={{top_px, left_px, width_px, height_px}}>
  <ShelfLabel id="{id}.sign" text="{name}" top_px={sign_top_px} width_px={sign_width_px} height_px={sign_height_px} />
<!--   <ShelfSideBoard id="{id + 'Right'}" top_px=0 left_px={width_px} width_px={boardDepth_px} height_px={height_px}
   thickness_px={thickness_px} /> -->
<!--   <ShelfBoard id="{id + 'BoardTop'}" top_px=0 left_px=0
   width_px={width_px + thickness_px} thickness_px={thickness_px} boardDepth_px={boardDepth_px}
   boardDistance_px={boardDistance_px}
   noBoxes={true} transparency=0.5 /> -->

  {#if boards.length === 0}
    <!-- TODO(KNR): factor 100 in top? -->
    <ShelfBoard id="{id + 'BoardBottom'}" top_px={(boards.length + 1) * 100 + 40} left_px=0
     width_px={width_px + thickness_px} thickness_px={thickness_px} boardDepth_px={boardDepth_px}
     boardDistance_px={boardDistance_px} slotCount={8} />
  {:else}
    {#each boards as boardId, i}
      <!-- TODO(KNR): hard coded slot count? -->
      <ShelfBoard id="{boardId}" top_px={(i + 1) * boardDistance_px + 80} left_px=0
       width_px={i === boards.length - 1 ? width_px + thickness_px : width_px}
       thickness_px={thickness_px} boardDepth_px={boardDepth_px} boardDistance_px={boardDistance_px} slotCount={boxesPerBoard} />
    {/each}
  {/if}

<!--   <ShelfSideBoard id="{id + 'Left'}" top_px=0 left_px=0 width_px={boardDepth_px} height_px={height_px}
   thickness_px={thickness_px} transparency=0.5>
    <ShelfLabel id="{id}.sign" text="{name}" top_px={sign_top_px} width_px={sign_width_px} height_px={sign_height_px} />
  </ShelfSideBoard> -->
</div>