<script>
  import { cssVariables } from '../helpers/css-helpers.js';

  export let shape;
  export let top;
  export let left;
  export let width;
  export let height;
</script>

<style>
  .shape {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--height);
    background-color:gray;  /* TODO(KNR): make it slightly transparent?! */
    clip-path: var(--shape);
  }
</style>

<div class="shape" use:cssVariables={{shape, top, left, height, width}} />