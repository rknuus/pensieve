<script>
  import { cssVariables } from '../helpers/css-helpers.js';

  export let id;
  export let top_px;
  export let left_px;
  export let width_px;
  export let height_px;
  export let top;
  export let left;
  export let width;
  export let height;

  console.assert(Number.isInteger(top_px) || Number.isInteger(top));
  // TODO(KNR): fix assertions
  // console.assert(Number.isInteger(left_px) || Number.isInteger(left));
  // console.assert(Number.isInteger(width_px) || Number.isInteger(width));
  console.assert(Number.isInteger(height_px) || Number.isInteger(height));

  $: top_px = top_px || top;
  $: left_px = left_px || left;
  $: width_px = width_px || width;
  $: height_px = height_px || height;
</script>

<style>
  .box-slot {
    position: absolute;
    top: var(--top_px);
    left: var(--left_px);
    width: var(--width_px);
    height: var(--height_px);

    /* NOTE(KNR): no need to rotate around X, because that's done in the parent board top div */
  
    border-style: dotted;
    border-width: 1px;
  }
</style>

<div id={id} class="box-slot" use:cssVariables={{top_px, left_px, width_px, height_px}} />