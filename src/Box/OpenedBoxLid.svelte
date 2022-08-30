<script>
  import BoxLid from './BoxLid.svelte';
  import { cssVariables } from '../helpers/css-helpers.js';

  export let top;
  export let left;
  export let width;
  export let height;
  export let depth;
</script>

<style>
  .opened-box-lid {
    position: absolute;
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--height);
    transform-style: preserve-3d;
    transform: rotateX(-90deg) translateZ(calc(-7.7 * var(--height))) translateX(calc(1.2 * var(--height)));
    transform-origin: center 0;
  }
</style>

<div class="opened-box-lid" use:cssVariables={{top, left, width, height, depth}}>
  <BoxLid top={top} left={left} width={width} height={height} depth={depth} />
</div>