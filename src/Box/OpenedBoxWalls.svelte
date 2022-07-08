<script>
  import { cssVariables } from '../helpers/css-helpers.js';
  import { positioning } from '../helpers/positioning-store.js';

  export let cardCount;
  export let selected;

  // For boxes with a small number of cards the box shape would look weird if the shape is directly
  // proportional to the number of cards. So always use a multiple of 64.
  $: capacity = 200 + Math.floor(cardCount / 100) * 100;

  $: cardWidth = $positioning.card.width + 'px';
  $: cardHeight = $positioning.card.height + 'px';
  $: boxDepth = capacity + 'px';

  $: cubeTop = cardHeight;
</script>

<style>
  /* borrowed from https://davidwalsh.name/css-cube */
  .cube {
    position: absolute;
    top: var(--cubeTop);
    width: var(--cardWidth);
    z-index: -1;
    transform-style: preserve-3d;
  }

  .wall {
    position: absolute;
    background: rgba(255,255,255,0.1);
    box-shadow: inset 0 0 30px rgba(0,0,0,0.3);
    color: rgba(0,0,0,0.5);
  }

  .back {
    top: 0px;
    left: 0px;
    width: var(--cardWidth);
    height: var(--cardHeight);
  }

  .right {
    top: 0px;
    left: var(--cardWidth);
    width: var(--boxDepth);
    height: var(--cardHeight);
    transform: rotateY(-90deg);
    transform-origin: center left;
  }

  .front {
    top: var(--cardHeight);
    left: 0px;
    width: var(--cardWidth);
    height: calc(var(--cardHeight) / 20);
    transform: translateZ(var(--boxDepth)) translateY(calc(-1 * var(--cardHeight) / 20));
  }

  .left {
    top: calc(var(--cardHeight) - var(--cardHeight) / 20);
    left: 0px;
    width: var(--cardWidth);
    height: calc(var(--cardHeight) / 20);
    transform: rotateY(-90deg);
    transform-origin: center left;
  }

  .bottom {
    top: var(--cardHeight);
    left: 0px;
    width: var(--cardWidth);
    height: var(--boxDepth);
    transform: rotateX(90deg);
    transform-origin: top center;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.7);
  }

  .selected {
    background: rgba(100,255,255,0.5);
  }
</style>

{#if cardCount > 0}
  <div class="cube" use:cssVariables={{cubeTop, cardWidth, cardHeight}}>
    <div class="back wall" class:selected use:cssVariables={{cardWidth, cardHeight, boxDepth}} />
    <div class="right wall" class:selected use:cssVariables={{cardWidth, cardHeight, boxDepth}} />
    <div class="front wall" class:selected use:cssVariables={{cardWidth, cardHeight, boxDepth}} />
    <div class="left wall" class:selected use:cssVariables={{cardWidth, cardHeight, boxDepth}} />
    <div class="bottom wall" class:selected use:cssVariables={{cardWidth, cardHeight, boxDepth}} />
  </div>
{/if}