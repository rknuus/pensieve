<script>
  import { cssVariables } from '../helpers/css-helpers.js';
  import { view } from '../View/view-store.js';

  export let top_px;
  export let left_px;
  export let width_px;

  function onDoubleClick(event) {
    view.leave();
  }
</script>

<style>
  .back-button {
    position: absolute;
    top: var(--top_px);
    left: var(--left_px);
    width: var(--width_px);
    cursor: pointer;
  }
</style>

<img class="back-button" src="media/fire_exit.svg" alt="back button" use:cssVariables={{top_px, left_px, width_px}} on:dblclick={onDoubleClick} />