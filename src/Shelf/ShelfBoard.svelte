<script>
  import Box from '../Box/Box.svelte';
  import BoxSlot from './BoxSlot.svelte';
  import { boards } from './board-store.js';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';
  import { onDestroy } from 'svelte';

  export let id;
  export let top_px;
  export let left_px;
  export let width_px;
  export let thickness_px;
  export let boardDepth_px;
  export let boardDistance_px;
  export let slotCount;
  export let top;
  export let left;
  export let width;
  export let thickness;
  export let boardDepth;
  export let boardDistance;
  export let noBoxes = false;
  export let transparency = 1.0;

  console.assert(Number.isInteger(top_px) || Number.isInteger(top));
  console.assert(Number.isInteger(left_px) || Number.isInteger(left));
  console.assert(Number.isInteger(width_px) || Number.isInteger(width));
  console.assert(Number.isInteger(thickness_px) || Number.isInteger(thickness));
  console.assert(Number.isInteger(boardDistance_px) || Number.isInteger(boardDistance));
  console.assert(Number.isInteger(slotCount) || noBoxes);
  console.assert(slotCount > 0 || noBoxes);
  console.assert(Number.isInteger(transparency));

  $: top_px = top_px || top;
  $: left_px = left_px || left;
  $: width_px = width_px || width;
  $: thickness_px = thickness_px || thickness;
  $: boardDepth_px = boardDepth_px || boardDepth;
  $: boardDistance_px = boardDistance_px || boardDistance;
  $: slotWidth_px = width_px / slotCount;
  $: highlightBoxDropZones = $display.highlightBoxDropZones;
  $: sourceId = $display.boxSourceId;
  $: console.log('selected box in board ' + id + ' is: ' + $display.selectedBox);

  let boxes;
  let openedBoxes = [];

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

  function onBoxSelected(event) {
    const selectedBox = event.detail;
    console.log('selected box ' + selectedBox);
    display.selectBox(selectedBox);
  }

  function onBoxOpened(event) {
    // onBoxSelected(event);  // ?!
    const openedBox = event.detail;
    console.assert(!openedBoxes.includes(openedBox));
    const updatedArray = [...openedBoxes];
    updatedArray.push(openedBox);
    openedBoxes = updatedArray;
    console.log('opened box ' + openedBox);
    console.log('currently open boxes are: ' + openedBoxes);
  }

  function onBoxClosed(event) {
    const closedBox = event.detail;
    console.assert(openedBoxes.includes(closedBox));
    openedBoxes = openedBoxes.filter((el) => { return el !== closedBox; });
    console.log('closed box ' + closedBox);
    console.log('currently open boxes are: ' + openedBoxes);
  }
</script>

<style>
  .board {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top_px);
    left: var(--left_px);
    width: var(--width_px);
    height: var(--boardDistance_px);
    z-index: -1;
    transform-style: preserve-3d;
  }

  .surface {
    position: absolute;
    background: rgba(168, 115, 40, var(--transparency)); /* #A87328; */  /* 16*10+8 = 168, 16*7+3 = 115, 16*2+8 = 40 */
    box-shadow: inset 0 0 30px rgba(0,0,0,0.3);
    /*color: rgba(0,0,0,0.5);*/
  }

  .top {
    top: 0px;
    left: 0px;
    width: var(--width_px);
    height: var(--boardDepth_px);
    transform: rotateX(90deg);
    transform-origin: top center;
    transform-style: preserve-3d;
  }

  .back {
    top: 0px;
    left: 0px;
    width: var(--width_px);
    height: var(--thickness_px);
  }

 .front {
    top: 0px;
    left: 0px;
    width: var(--width_px);
    height: var(--thickness_px);
    transform: translateZ(var(--boardDepth_px));
    transform-origin: top center;
  }

  .bottom {
    top: var(--thickness_px);
    left: 0px;
    width: var(--width_px);
    height: var(--boardDepth_px);
    transform: rotateX(90deg);
    transform-origin: top center;
  }
</style>

<div class="board" id="{id}" use:cssVariables={{top_px, left_px, width_px, boardDepth_px, boardDistance_px}}>
  {#if !noBoxes}
    {#each boxes as box, i}
      <Box id="{box}" opened={openedBoxes.includes(box)} selected={box === $display.selectedBox} top={-2*112} left={i * slotWidth_px} height={2*112} width={200} depth={boardDepth_px} on:selected="{onBoxSelected}" on:opened="{onBoxOpened}" on:closed="{onBoxClosed}" />
    {/each}
  {/if}
  <div class="top surface" use:cssVariables={{width_px, boardDepth_px, thickness_px, transparency}}>
    {#if !noBoxes && (highlightBoxDropZones && sourceId !== id)}
      <!-- borrowed from https://www.eternaldev.com/blog/5-ways-to-perform-for-loop-in-svelte-each-block/ -->
      {#each Array(slotCount) as _, i}
        <BoxSlot id="{id + '.' + i}" top_px={0} left_px={i * slotWidth_px} width_px={slotWidth_px} height_px={boardDepth_px} />
      {/each}
    {/if}
  </div>
  <div class="front surface" use:cssVariables={{width_px, boardDepth_px, thickness_px, transparency}} />
  <div class="back surface" use:cssVariables={{width_px, boardDepth_px, thickness_px, transparency}} />
  <div class="bottom surface" use:cssVariables={{width_px, boardDepth_px, thickness_px, transparency}} />
</div>