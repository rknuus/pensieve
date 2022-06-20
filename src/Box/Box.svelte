<script>
  import OpenCards from './OpenCards.svelte';
  import FlippedCards from './FlippedCards.svelte';

  export let id;
  export let top;
  export let left;
  export let selected = false;

  $: lowerTop = parseInt(top) + 112;

  console.assert(id, 'box has no valid ID');

  function getCssTop(node) {
    return node.style.getProperty(`--top`);
  }
</script>

<style>
  .box {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
/*    top: var(--top);
    left: var(--left);*/
/*    width: var(--width);
    height: var(--height);*/
  }
</style>

<div class="box">
  <OpenCards id="{id}" top="{top}px" left="{left}px" />
  <FlippedCards id="{id}" top="{lowerTop}px" left="{left}px" />
</div>