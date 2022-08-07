<script>
  import { cssVariables } from '../helpers/css-helpers.js';
  import ShelfBoard from './ShelfBoard.svelte';
  import ShelfSide from './ShelfSide.svelte';

  export let id;
  export let top;
  export let left;
  export let width;
  export let thickness;
  export let boardCount;
  export let boardDistance;
  export let boardDepth;

  $: height = Math.max(1, boardCount) * boardDistance;

  console.assert(Number.isInteger(boardCount));
  console.assert(Number.isInteger(thickness));
  console.assert(Number.isInteger(boardDistance));
  console.assert(Number.isInteger(boardDepth));
  console.assert(Number.isInteger(top));
  console.assert(Number.isInteger(left));
  console.assert(Number.isInteger(width));
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
  <ShelfSide id="{id + 'Right'}" top={0} left={left + width} width={boardDepth} height={height}
   thickness={thickness} />

  <!-- borrowed from https://www.eternaldev.com/blog/5-ways-to-perform-for-loop-in-svelte-each-block/ -->
  {#each Array(boardCount) as _, i}
    <ShelfBoard id="{id + 'Board' + i}" top={i * 100} left={left} width={width}
     thickness={thickness} boardDepth={boardDepth} boardDistance={boardDistance} />
  {/each}

  <ShelfBoard id="{id + 'Board' + boardCount}" top={boardCount * 100} left={left}
   width={width + thickness} thickness={thickness} boardDepth={boardDepth}
   boardDistance={boardDistance} />

  <ShelfSide id="{id + 'Left'}" top={0} left={left} width={boardDepth} height={height}
   thickness={thickness} />
</div>