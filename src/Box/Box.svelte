<script>
  import OpenCards from './OpenCards.svelte';
  import FlippedCards from './FlippedCards.svelte';

  export let id;

  console.assert(id, 'box has no valid ID');
</script>

<style>
  .box {
    position: absolute;
    /* borrowed from https://svelte.dev/repl/ccdb128d448c4b92babeaccb4be35567?version=3.46.2 */
    top: var(--top);
    left: var(--left);
  }
</style>

<div class="box">
  <OpenCards id="{id}" />
  <FlippedCards  id="{id}" />
</div>