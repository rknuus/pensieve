<script>
  import ShelfBoard from './ShelfBoard.svelte';
  import ShelfSideBoard from './ShelfSideBoard.svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { onDestroy } from 'svelte';
  import { shelfs } from './shelf-store.js';

  export let id;
  export let top;
  export let left;
  export let width;
  export let thickness;
  export let boardDistance;
  export let boardDepth;

  let boards;
  let height;

  console.assert(Number.isInteger(thickness));
  console.assert(Number.isInteger(boardDistance));
  console.assert(Number.isInteger(boardDepth));
  console.assert(Number.isInteger(top));
  console.assert(Number.isInteger(left));
  console.assert(Number.isInteger(width));

  const unsubscribeShelfs = shelfs.subscribe(items => {
    const shelf = items.find(i => i.id === id);
    console.assert(shelf, 'shelf with ID %s not found in shelf store', id);
    boards = shelf.boards;

    height = Math.max(1, boards.length) * boardDistance;
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
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--height);
    transform-style: preserve-3d;
  }
</style>

<div class="shelf" id="{id}" use:cssVariables={{top, left, width, height}}>
  <ShelfSideBoard id="{id + 'Right'}" top={0} left={left + width} width={boardDepth} height={height}
   thickness={thickness} />

  <ShelfBoard id="{id + 'BoardTop'}" top={0} left={left}
   width={width + thickness} thickness={thickness} boardDepth={boardDepth}
   boardDistance={boardDistance}
   noBoxes={true} />

  {#if boards.length === 0}
    <ShelfBoard id="{id + 'BoardBottom'}" top={(boards.length + 1) * 100} left={left}
     width={width + thickness} thickness={thickness} boardDepth={boardDepth}
     boardDistance={boardDistance} slotCount={8} />
  {:else}
    {#each boards as boardId, i}
      <ShelfBoard id="{boardId}" top={(i + 1) * 100} left={left} width={i === boards.length - 1 ? width + thickness : width}
       thickness={thickness} boardDepth={boardDepth} boardDistance={boardDistance} slotCount={8} />
    {/each}
  {/if}

  <ShelfSideBoard id="{id + 'Left'}" top={0} left={left} width={boardDepth} height={height}
   thickness={thickness} />
</div>