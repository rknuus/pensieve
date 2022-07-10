<script>
  import { cssVariables } from '../helpers/css-helpers.js';

  export let shape;
  export let top;
  export let left;
  export let width;
  export let height;
</script>

<style>
  .box-shade {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--height);
    /* borrowed from https://cssdeck.com/labs/css-shapes-with-gradients */
    background: linear-gradient(to bottom, #dddddd 0%,#444444 100%);
    transform:skew(45deg) scaleY(.7071); /* .7071 = cos(45deg) */
  }
</style>

<div class="box-shade" use:cssVariables={{top, left, height, width}} />