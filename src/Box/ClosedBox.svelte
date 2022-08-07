<script>
  import BoxBody from './BoxBody.svelte';
  import BoxLid from './BoxLid.svelte';
  import { cssVariables } from '../helpers/css-helpers.js';

  export let id;
  export let top;
  export let left;
  export let width;
  export let height;
  export let depth;

  $: lidHeight = height * 0.1;

  $: bodyHeight = height * 0.98;
  $: bodyTop = height - bodyHeight;
  $: bodyWidth = width * 0.98;
  $: bodyLeft = width - bodyWidth;
  $: bodyDepth = depth * 0.98;
</script>

<style>
  /* borrowed from https://davidwalsh.name/css-cube */
  .closed-box {
    position: absolute;
    top: var(--top);
    left: var(--left);
    width: var(--width);
    z-index: -1;
    transform-style: preserve-3d;
    transform: perspective(50cm) rotateX(-2deg) rotateY(20deg);
    transform-origin: top center;
  }
</style>

<div id={id} class="closed-box" use:cssVariables={{top, left, width, height}}>
  <BoxLid top={0} left={0} width={width} height={lidHeight} depth={depth} />
  <BoxBody top={bodyTop} left={bodyLeft} width={bodyWidth} height={bodyHeight} depth={bodyDepth} />
</div>