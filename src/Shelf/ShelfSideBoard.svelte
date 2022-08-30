<script>
 import { cssVariables } from '../helpers/css-helpers.js';

  export let id;
  export let top_px;
  export let left_px;
  export let width_px;
  export let height_px;
  export let thickness_px;
  export let top;
  export let left;
  export let width;
  export let height;
  export let thickness;

  console.assert(Number.isInteger(top_px) || Number.isInteger(top));
  console.assert(Number.isInteger(left_px) || Number.isInteger(left));
  console.assert(Number.isInteger(width_px) || Number.isInteger(width));
  console.assert(Number.isInteger(height_px) || Number.isInteger(height));
  console.assert(Number.isInteger(thickness_px) || Number.isInteger(thickness));

  $: top_px = top_px || top;
  $: left_px = left_px || left;
  $: width_px = width_px || width;
  $: height_px = height_px || height;
  $: thickness_px = thickness_px || thickness;
</script>

<style>
  .side {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top_px);
    left: var(--left_px);
    width: var(--width_px);
    height: var(--height_px);
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
    width: var(--thickness_px);
    height: var(--width_px);
    transform: rotateX(90deg);
    transform-origin: top center;
  }

  .right {
    top: 0px;
    left: var(--thickness_px);
    width: var(--height_px);
    height: var(--width_px);
    transform:  rotateX(90deg) rotateY(90deg);
    transform-origin: top left;
  }

  .back {
    top: 0px;
    left: 0px;
    width: var(--thickness_px);
    height: var(--height_px);
  }

 .front {
    top: 0px;
    left: 0px;
    width: var(--thickness_px);
    height: var(--height_px);
    transform: translateZ(var(--width_px));
    transform-origin: top center;
  }

  .left {
    top: 0px;
    left: 0px;
    width: var(--width_px);
    height: var(--height_px);
    transform: rotateY(-90deg);
    transform-origin: top left;
    transform-style: preserve-3d;
  }

  .bottom {
    top: var(--height_px);
    left: 0px;
    width: var(--thickness_px);
    height: var(--width_px);
    transform: rotateX(90deg);
    transform-origin: top center;
  }
</style>

<div class="side" id="{id}" use:cssVariables={{top_px, left_px, width_px, height_px}}>
  <div class="top surface" use:cssVariables={{height_px, width_px, thickness_px}} />
  <div class="right surface" use:cssVariables={{height_px, width_px, thickness_px}} />
  <div class="front surface" use:cssVariables={{height_px, width_px, thickness_px}} />
  <div class="back surface" use:cssVariables={{height_px, width_px, thickness_px}} />
  <div class="left surface" use:cssVariables={{height_px, width_px, thickness_px}}>
  <div class="bottom surface" use:cssVariables={{height_px, width_px, thickness_px}} />
</div>