<script>
 import { cssVariables } from '../helpers/css-helpers.js';

  export let id;
  export let top;
  export let left;
  export let width;
  export let thickness;
  export let boardDepth;
  export let boardDistance;

  console.assert(Number.isInteger(top));
  console.assert(Number.isInteger(left));
  console.assert(Number.isInteger(width));
  console.assert(Number.isInteger(thickness));
  console.assert(Number.isInteger(boardDistance));
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
  <div class="top surface" use:cssVariables={{width, boardDepth, thickness}} />
  <div class="front surface" use:cssVariables={{width, boardDepth, thickness}} />
  <div class="back surface" use:cssVariables={{width, boardDepth, thickness}} />
  <div class="bottom surface" use:cssVariables={{width, boardDepth, thickness}} />
</div>