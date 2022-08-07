<script>
  import ClosedBox from './Box/ClosedBox.svelte';
  import OpenedBox from './Box/OpenedBox.svelte';
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
  .app {
    position: absolute;
    top: 50px;
    left: 50px;
    transform-style: preserve-3d;
    transform: perspective(50cm) rotateX(-2deg) rotateY(20deg);
    transform-origin: top center;
  }
</style>

<div class="app">
  {#each stackIds as id, i}
    <Stack id="{id}" top={50} left={50 + i * 400} />
  {/each}

  {#each boxIds as id, i}
    <OpenedBox id="{id}" selected={id === selectedBox} top={300} left={50 + i * 400} on:selected="{onBoxSelected}" />
  {/each}

<Shelf id="shelfA" boardCount={4} thickness={10} boardDistance={100} boardDepth={250} top={650} left={50} width={720} />
  <ClosedBox id="BoxZ" top={650} left={50} height={75} width={75} depth={150} />

</div>