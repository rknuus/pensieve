<script>
 import { cssVariables } from '../helpers/css-helpers.js';

  export let id;
  export let top;
  export let left;
  export let width;
  export let height;
  export let thickness;

  console.assert(Number.isInteger(top));
  console.assert(Number.isInteger(left));
  console.assert(Number.isInteger(width));
  console.assert(Number.isInteger(height));
  console.assert(Number.isInteger(thickness));
</script>

<style>
  .side {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--height);
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
    width: var(--thickness);
    height: var(--width);
    transform: rotateX(90deg);
    transform-origin: top center;
  }

  .right {
    top: 0px;
    left: var(--thickness);
    width: var(--height);
    height: var(--width);
    transform:  rotateX(90deg) rotateY(90deg);
    transform-origin: top left;
  }

  .back {
    top: 0px;
    left: 0px;
    width: var(--thickness);
    height: var(--height);
  }

 .front {
    top: 0px;
    left: 0px;
    width: var(--thickness);
    height: var(--height);
    transform: translateZ(var(--width));
    transform-origin: top center;
  }

  .left {
    top: 0px;
    left: 0px;
    width: var(--height);
    height: var(--width);
    transform:  rotateX(90deg) rotateY(90deg);
    transform-origin: top left;
  }

  .bottom {
    top: var(--height);
    left: 0px;
    width: var(--thickness);
    height: var(--width);
    transform: rotateX(90deg);
    transform-origin: top center;
  }
</style>

<div class="side" id="{id}" use:cssVariables={{top, left, width, height}}>
  <div class="top surface" use:cssVariables={{height, width, thickness}} />
  <div class="right surface" use:cssVariables={{height, width, thickness}} />
  <div class="front surface" use:cssVariables={{height, width, thickness}} />
  <div class="back surface" use:cssVariables={{height, width, thickness}} />
  <div class="left surface" use:cssVariables={{height, width, thickness}} />
  <div class="bottom surface" use:cssVariables={{height, width, thickness}} />
</div>