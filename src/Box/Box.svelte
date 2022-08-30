<script>
  import ClosedBox from './ClosedBox.svelte';
  import OpenedBox2 from './OpenedBox2.svelte';
  import { createEventDispatcher } from 'svelte';

  export let id;
  export let parentId;
  export let top;
  export let left;
  export let width;
  export let height;
  export let depth;
  export let opened;
  export let selected;

  // TODO(KNR): assert properties are set correctly

  const dispatch = createEventDispatcher();

  $: closedHeight = height / 2;
  $: closedTop = top + closedHeight;

  function onKeyDown(e) {
    if (opened) {
      console.log('box ' + id + ' got key ' + e.keyCode);
      switch (e.keyCode) {
        case 67:  // left
          dispatch('closed', id);
          break;
      }
    }
  }
</script>

{#if opened}
  <OpenedBox2 id="{id}" selected={selected} top={top} left={left} width={width} height={height} depth={depth} on:closed on:selected />
{:else}
  <ClosedBox id="{id}" top={closedTop} left={left} width={width} height={closedHeight} depth={depth} on:opened />
{/if}

<svelte:window on:keydown|preventDefault={onKeyDown} />