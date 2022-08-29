<script>
  import BackButton from './Navigation/BackButton.svelte';
  import ShelfFront from './Shelf/ShelfFront.svelte';
  import ShelfSide from './Shelf/ShelfSide.svelte';
  import Stack from './Stack/Stack.svelte';
  import ViewIn3D from './helpers/ViewIn3D.svelte';
  import { library } from './Library/library-store.js';
  import { view } from './View/view-store.js';

  $: current_library = $library;
  $: current_view = $view.current;
  $: selected = $view.selected;

  function openShelf(event) {
    const selecteShelf = event.detail;
    console.log('selected shelf ' + selecteShelf);
    view.enter('shelf', selecteShelf);
  }

  // OLD
  import ClosedBox from './Box/ClosedBox.svelte';
  import OpenedBox from './Box/OpenedBox.svelte';
  import Shelf from './Shelf/Shelf.svelte';
  // import Stack from './Stack/Stack.svelte';
  import { boxes } from './Box/box-store.js';
  import { get } from 'svelte/store';
  import { shelfs } from './Shelf/shelf-store.js';
  import { stacks } from './Stack/stack-store.js';

  let selectedBox = null;

  // borrowed from https://www.webtips.dev/webtips/svelte/how-to-read-values-of-a-store-in-svelte
  $: stackIds = get(stacks).map(e => e.id);
  $: boxIds= get(boxes).map(e => e.id);
  $: shelfIds = get(shelfs).map(e => e.id);

  function onBoxSelected(event) {
    selectedBox = event.detail;
    console.log('selected box ' + selectedBox);
  }
  // END OLD
</script>

<style>
  .app {
    position: absolute;
  }

  .old {
    position: absolute;
    top: 700px;
    left: 50px;
    transform-style: preserve-3d;
    transform: /*perspective(50cm)*/ rotateX(-7deg) rotateY(7deg);
    transform-origin: top center;
  }
</style>

<div class="app" draggable={false}>
  {#if current_view === 'library'}
    <!-- TODO(KNR): share 3D effect for inbox and the inboxes of all shelfs -->
    <ViewIn3D perspective="perspective(50cm)" rotateX="-2deg" rotateY="2deg" transform_origin="top center">
      <Stack id="inbox" top_px={20 + 600 - 1.5 * 112} left_px={20} />
    </ViewIn3D>

    {#each current_library.shelfs as id, i}
      <ShelfSide id={id} top_px={20} left_px={400 + i * 400} width_px={220} height_px={600} on:openedShelf={openShelf} />
    {/each}
  {:else if current_view === 'shelf'}
    <ViewIn3D perspective="perspective(50cm)" rotateX="-2deg" rotateY="2deg" transform_origin="top center">
      <Stack id="inbox" top_px={20 + 600 - 1.5 * 112} left_px={20} />
      <BackButton top_px={20 + 112} left_px={20} width_px={200} />
      <ShelfFront id="{selected}" thickness={10} boardDistance={100} boardDepth={150} top={20} left={200} width={720} />
    </ViewIn3D>
  {:else if current_view === 'board'}
    <p>show board</p>
  {:else if current_view === 'box'}
    <p>show box</p>
  {:else}
    <h1>The pensieve developers messed up, there is no view called {current_view}</h1>
    <p>Please report this <a href="https://github.com/rknuus/pensieve/issues">issue</a>.</p>
  {/if}

  <!-- OLD -->
  <div class="old">
    <hr>

    {#each stackIds as id, i}
      <Stack id="{id}" top={10} left={50 + i * 400} />
    {/each}

    {#each boxIds as id, i}
      <OpenedBox id="{id}" selected={id === selectedBox} top={250} left={50 + i * 400} on:selected="{onBoxSelected}" />
    {/each}

    <ClosedBox id="BoxZ" top={650} left={50} height={75} width={75} depth={150} />

    <!-- TODO(KNR): use recently found way to get the dimension of the child shelf to determine the top position -->
    {#each shelfIds as id, i}
      <Shelf id="{id}" thickness={10} boardDistance={100} boardDepth={150} top={800 + i * 400} left={50} width={720} />
    {/each}
  </div>
  <!-- END OLD -->
</div>