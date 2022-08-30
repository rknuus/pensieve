<script>
  import { cssVariables } from '../helpers/css-helpers.js';

  export let id;
  export let text;
  export let top_px;
  export let width_px;
  export let height_px;

  console.assert(id, 'shelf-label has no valid ID');
</script>

<style>
  .shelf-label {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top_px);
    left: 50%;
    transform: translateX(-50%);
    width: var(--width_px);
    height: var(--height_px);
    transform-style: preserve-3d;

    box-shadow: 1px 1px 3px rgba(0,0,0,.50);
    background-color: white;  /* avoid cards being transparent */

    user-select: none;  /* Prevent selection of text when double-clicking the parent shelf */
  }

  .shelf-label p {
    margin: 10px;
    color: black;
  }
</style>

<div class="shelf-label" id="{id}" use:cssVariables={{top_px, width_px, height_px}}>
  <p>{text}</p>
</div>