<script>
  import Box from './Box/Box.svelte';
  import Stack from './Stack/Stack.svelte';
  import { boxes } from './Box/box-store.js';
  import { get } from 'svelte/store';

  let selectedBox = null;

  const boxIds= get(boxes).map(e => e.id);

  function onBoxSelected(event) {
    selectedBox = event.detail;
    console.log('selected box ' + selectedBox);
  }
</script>

<style>
</style>

<Stack id="stackA" top="50" left="50" />
<Stack id="stackB" top="50" left="450" />
<Stack id="stackC" top="50" left="850" />

{#each boxIds as id, i}
  <Box id="{id}" selected={id === selectedBox} top="300" left="{50 + i * 400}" on:selected="{onBoxSelected}" />
{/each}