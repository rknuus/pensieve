<script>
  import BoxBody from './BoxBody.svelte';
  import BoxLid from './BoxLid.svelte';
  import { cssVariables } from '../helpers/css-helpers.js';
  import { display } from '../helpers/display-store.js';

  export let id;
  export let top;
  export let left;
  export let width;
  export let height;
  export let depth;

  const parentId = 81;  // TODO(KNR): replace by property
  const dragEnabled = true;

  $: lidHeight = height * 0.1;

  $: bodyHeight = height * 0.98;
  $: bodyTop = height - bodyHeight;
  $: bodyWidth = width * 0.98;
  $: bodyLeft = width - bodyWidth;
  $: bodyDepth = depth * 0.98;

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
</script>

<style>
  /* borrowed from https://davidwalsh.name/css-cube */
  .closed-box {
    position: absolute;
    top: var(--top);
    left: var(--left);
    width: var(--width);
    z-index: -1;
    transform-style: preserve-3d;
    cursor: move;
  }
</style>

<div id={id} class="closed-box" class:draggable="{dragEnabled}" draggable={dragEnabled} on:dragstart="{onDragStart}" on:dragend="{onDragEnd}" use:cssVariables={{top, left, width, height}}>
  <BoxLid top={0} left={0} width={width} height={lidHeight} depth={depth} />
  <BoxBody top={bodyTop} left={bodyLeft} width={bodyWidth} height={bodyHeight} depth={bodyDepth} />
</div>