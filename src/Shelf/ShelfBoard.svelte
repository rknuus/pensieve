<script>
  import { boards } from './board-store.js';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { onDestroy } from 'svelte';
  import BoxSlot from './BoxSlot.svelte';

  export let id;
  export let top;
  export let left;
  export let width;
  export let slotCount;
  export let thickness;
  export let boardDepth;
  export let boardDistance;
  export let noBoxes = false;

  console.assert(Number.isInteger(top));
  console.assert(Number.isInteger(left));
  console.assert(Number.isInteger(width));
  console.assert(Number.isInteger(slotCount) || noBoxes);
  console.assert(slotCount > 0 || noBoxes);
  console.assert(Number.isInteger(thickness));
  console.assert(Number.isInteger(boardDistance));

  $: slotWidth = width / slotCount;

  let boxes;

  const unsubscribeBoards = boards.subscribe(items => {
    if (noBoxes) { return; }
    const board = items.find(i => i.id === id);
    if (!board) {
      boxes = [];  /* TODO(KNR): we will probably forget to add the board to the store, perhaps we should add it here?! */
      return;
    }
    console.assert(board, 'board with ID %s not found in board store', id);
    boxes = board.boxes;
  });

  onDestroy(() => {
    if (unsubscribeBoards) {
      unsubscribeBoards();
    }
  });
</script>

<style>
  .board {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--boardDistance);
    z-index: -1;
    transform-style: preserve-3d;
  }

  .surface {
    position: absolute;
    background: #A87328;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.3);
    color: rgba(0,0,0,0.5);
  }

  .top {
    top: 0px;
    left: 0px;
    width: var(--width);
    height: var(--boardDepth);
    transform: rotateX(90deg);
    transform-origin: top center;
    transform-style: preserve-3d;
  }

  .back {
    top: 0px;
    left: 0px;
    width: var(--width);
    height: var(--thickness);
  }

 .front {
    top: 0px;
    left: 0px;
    width: var(--width);
    height: var(--thickness);
    transform: translateZ(var(--boardDepth));
    transform-origin: top center;
  }

  .bottom {
    top: var(--thickness);
    left: 0px;
    width: var(--width);
    height: var(--boardDepth);
    transform: rotateX(90deg);
    transform-origin: top center;
  }
</style>

<div class="board" id="{id}" use:cssVariables={{top, left, width, boardDepth, boardDistance}}>
  <div class="top surface" use:cssVariables={{width, boardDepth, thickness}}>
    {#if !noBoxes}
      <!-- borrowed from https://www.eternaldev.com/blog/5-ways-to-perform-for-loop-in-svelte-each-block/ -->
      {#each Array(slotCount) as _, i}
        <BoxSlot id="{id + '.' + i}" top={0} left={i * slotWidth} width={slotWidth} height={boardDepth} />
      {/each}
    {/if}
  </div>
  <div class="front surface" use:cssVariables={{width, boardDepth, thickness}} />
  <div class="back surface" use:cssVariables={{width, boardDepth, thickness}} />
  <div class="bottom surface" use:cssVariables={{width, boardDepth, thickness}} />
</div>