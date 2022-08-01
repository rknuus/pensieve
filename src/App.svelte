<script>
  import Box from './Box/Box.svelte';
  import Shelf from './Shelf/Shelf.svelte';
  import Stack from './Stack/Stack.svelte';
  import { boxes } from './Box/box-store.js';
  import { get } from 'svelte/store';
  import { stacks } from './Stack/stack-store.js';

  let selectedBox = null;

  // borrowed from https://www.webtips.dev/webtips/svelte/how-to-read-values-of-a-store-in-svelte
  $: stackIds = get(stacks).map(e => e.id);
  $: boxIds= get(boxes).map(e => e.id);

  function onBoxSelected(event) {
    selectedBox = event.detail;
    console.log('selected box ' + selectedBox);
  }
</script>

<style>
</style>

{#each stackIds as id, i}
  <Stack id="{id}" top="50" left="{50 + i * 400}" />
{/each}

{#each boxIds as id, i}
  <Box id="{id}" selected={id === selectedBox} top="300" left="{50 + i * 400}" on:selected="{onBoxSelected}" />
{/each}

<Shelf id="shelfA" boardCount={4} thickness={10} boardDistance={100} boardDepth={250} top={650} left={50} width={720} />