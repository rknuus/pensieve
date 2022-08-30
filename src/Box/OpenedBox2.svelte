<script>
  import BoxBody from './BoxBody.svelte';
  import FlippedCards from './FlippedCards.svelte';
  import OpenCards from './OpenCards.svelte';
  import OpenedBoxLid from './OpenedBoxLid.svelte';
  import { boxes } from './box-store.js';
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';
  import { getCardOffset, getHeight  } from '../helpers/display-helpers.js';
  import { getStore } from '../helpers/stores.js';

  export let id;
  export let top;
  export let left;
  export let width;
  export let height;
  export let depth;
  export let selected;

  const parentId = 81;  // TODO(KNR): replace by property
  const dragEnabled = true;
  const dispatch = createEventDispatcher();

  let name;
  let openCards;
  let flippedCards;

  const unsubscribeBoxes = boxes.subscribe(items => {
    const box = items.find(i => i.id === id);
    console.assert(box, 'flipped cards with ID %s not found in box store', id);
    name = box.name;
    openCards = box.cards;
    flippedCards = box.flippedCards;
  });

  onDestroy(() => {
    if (unsubscribeBoxes) {
      unsubscribeBoxes();
    }
  });

  $: allCards = openCards && openCards.concat(flippedCards) || [];
  $: openTop = top + getHeight(allCards) + getCardOffset(allCards.length);
  $: closedTop = top + getHeight(allCards) + getCardOffset(allCards.length);

  $: lidHeight = height * 0.1;
  $: bodyHeight = height / 2;
  $: bodyTop = height - bodyHeight;
  $: bodyWidth = width;
  $: bodyLeft = width - bodyWidth;
  $: bodyDepth = depth;

  function onDragStart(event) {
    // setting data is borrowed from https://svelte.dev/repl/b225504c9fea44b189ed5bfb566df6e6?version=3.48.0
    const data = {boxId: id, sourceId: parentId};
    event.dataTransfer.setData('text/plain', JSON.stringify(data));
    event.dataTransfer.effectAllowed = 'move';
    console.debug('starting to drag box ' + id + ' from source ' + parentId);
    display.startDraggingBox(parentId);
  }

  function onDragEnd(event) {
    console.debug('stop dragging box ' + id);
    display.stopDraggingBox();
    // Apparently we don't have to clear the transfer data
  }

  function onDrop(e) {
    // TODO(KNR): apart from the target store this function is identical to onDrop of Stack
    // getting data is borrowed from https://svelte.dev/repl/b225504c9fea44b189ed5bfb566df6e6?version=3.48.0
    const json = event.dataTransfer.getData("text/plain");
    const eventData = JSON.parse(json);
    const cardId = eventData.cardId;
    const sourceStore = getStore(eventData.sourceStore);
    sourceStore.removeCard(cardId, eventData.sourceId);
    boxes.addCard(cardId, id);
    display.stopDraggingCard();
    console.debug('dropped item ' + cardId + ' onto target box ' + id);
  }

  // function onSingleclick(event) {
  function onClick(event) {
    // distinction of single and double click is borrowed from https://stackoverflow.com/a/53939059
    if (event.detail === 1) {  // single click
      // TODO(KNR): a single click event is dispatched even in case of a double click
      // see https://stackoverflow.com/a/5497142 and comments
      dispatch('closed', id);
    } else if (event.detail === 2) {  // double click
      // dispatch('opened', id);
      dispatch('selected', id);
    }
  }

  // function onDoubleclick(event) {
  //   dispatch('selected', id);
  // }

  function onKeyDown(e) {
    if (selected) {
      console.log('box ' + id + ' got key ' + e.keyCode);
      switch (e.keyCode) {
        case 37:  // left
          flipCardUp();
          break;
        case 39:  // right
          flipCardDown();
          break;
        case 38:  // up
          flipCardUp();
          break;
        case 40:  // down
          flipCardDown();
          break;
      }
    }
  }

  function flipCardUp() {
    if (flippedCards.length > 0) {
      boxes.flipCardUp(id);
    }
  }

  function flipCardDown() {
    if (openCards.length > 0) {
      boxes.flipCardDown(id);
    }
  }
</script>

<style>
  /* borrowed from https://davidwalsh.name/css-cube */
  .opened-box {
    position: absolute;
    top: var(--top);
    left: var(--left);
    width: var(--width);
    z-index: -1;
    transform-style: preserve-3d;
    cursor: move;
  }
</style>

<div id={id} class="opened-box" class:draggable="{dragEnabled}" draggable={dragEnabled} on:dragstart="{onDragStart}" on:dragend="{onDragEnd}" use:cssVariables={{top, left, width, height}} on:click="{onClick}">
  <!-- <OpenedBoxLid top={2 * bodyTop} left={0} width={width} height={lidHeight} depth={depth} /> -->
  <OpenCards id="{id}" top=0 left=0 on:drop="{onDrop}" />
  <BoxBody name="{name}" top={bodyTop} left={bodyLeft} width={bodyWidth} height={bodyHeight} depth={bodyDepth} selected={selected} />
  <FlippedCards id="{id}" top={bodyTop} left={left} useNewFlip={true} />
</div>

<svelte:window on:keydown|preventDefault={onKeyDown} />