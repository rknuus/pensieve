<script>
  import Box from './Box/Box.svelte';
  import BackButton from './Navigation/BackButton.svelte';
  import ShelfFront from './Shelf/ShelfFront.svelte';
  import ShelfSide from './Shelf/ShelfSide.svelte';
  import Stack from './Stack/Stack.svelte';
  import ViewIn3D from './helpers/ViewIn3D.svelte';
  import { display } from './helpers/display-store.js';
  import { library } from './Library/library-store.js';
  import { view } from './View/view-store.js';

  let openedBoxes = [];

  const boardCount = 3;
  const boxesPerBoard = 4;

  $: current_library = $library;
  $: current_view = $view.current;
  $: selected = $view.selected;
  $: console.log('selected box in App is: ' + $display.selectedBox);

  function openShelf(event) {
    const selecteShelf = event.detail;
    console.log('selected shelf ' + selecteShelf);
    view.enter('shelf', selecteShelf);
  }

  function onBoxSelected(event) {
    const selectedBox = event.detail;
    console.log('selected box ' + selectedBox);
    display.selectBox(selectedBox);
  }

  function onBoxOpened(event) {
    onBoxSelected(event);  // ?!
    const openedBox = event.detail;
    console.assert(!openedBoxes.includes(openedBox));
    const updatedArray = [...openedBox];
    updatedArray.push(openedBox);
    openedBoxes = updatedArray;
    console.log('opened box ' + openedBox);
  }

  function onBoxClosed(event) {
    const closedBox = event.detail;
    console.assert(openedBoxes.includes(closedBox));
    openedBoxes = openedBoxes.filter((el) => { return el !== closedBox; });
    console.log('closed box ' + closedBox);
  }

</script>

<style>
  .app {
    position: absolute;
    height: 1600px;
  }

  .three-d {
    transform-style: preserve-3d;
    transform: /*perspective(50cm)*/ rotateX(-7deg) rotateY(7deg);
    transform-origin: top center;
  }
</style>

<div class="app" draggable={false}>
  {#if current_view === 'library'}
    <!-- TODO(KNR): share 3D effect for inbox and the inboxes of all shelfs -->
    <ViewIn3D perspective="perspective(50cm)" rotateX="-2deg" rotateY="2deg" transform_origin="top center">
      <Stack id="inbox" top_px={100 + 600 - 1.5 * 112} left_px={20} />
    </ViewIn3D>

    {#each current_library.shelfs as id, i}
      <ShelfSide id={id} top_px={100} left_px={400 + i * 400} width_px={220} height_px={600} on:openedShelf={openShelf} />
    {/each}
  {:else if current_view === 'shelf'}
    <ViewIn3D perspective="perspective(50cm)" rotateX="-2deg" rotateY="2deg" transform_origin="top center">
      <Stack id="inbox" top_px={100 + 600 - 1.5 * 112} left_px={20} />
      <BackButton top_px={100 + 112} left_px={20} width_px={200} />
      <ShelfFront id="{selected}" boardCount={boardCount} boxesPerBoard={boxesPerBoard} thickness_px={10} boardDistance_px={250} boardDepth_px={150} top_px={100} left_px={620} width_px={205 * boxesPerBoard} height_px={250 * boardCount} />
    </ViewIn3D>
  {:else if current_view === 'board'}
    <p>show board</p>
  {:else if current_view === 'box'}
    <p>show box</p>
  {:else}
    <h1>The pensieve developers messed up, there is no view called {current_view}</h1>
    <p>Please report this <a href="https://github.com/rknuus/pensieve/issues">issue</a>.</p>
  {/if}

<!--   <div class="three-d">
    <Box id="boxKappa" opened={openedBoxes.includes("boxKappa")} selected={"boxKappa" === $display.selectedBox} top={780+60} left={350} height={2*112} width={200} depth={200} on:selected="{onBoxSelected}" on:opened="{onBoxOpened}" on:closed="{onBoxClosed}" />
  </div> -->
</div>