<script>
  import { cssVariables } from '../helpers/css-helpers.js';
  import { positioning } from '../helpers/positioning-store.js';

  export let top;
  export let left;
  export let cardCount;
  let width;
  let height;

  // For boxes with a small number of cards the box shape would look weird if the shape is directly
  // proportional to the number of cards. So always use a multiple of 64.
  $: capacity = 64 + Math.floor(cardCount / 64) * 64;

  $: cardWidth = $positioning.card.width + 'px';
  $: cardHeight = $positioning.card.height + 'px';
  $: boxDepth = capacity + 'px';

  $: cubeTop = cardHeight;
</script>

<style>
  /* borrowed from https://davidwalsh.name/css-cube */
  /* scene wrapper */
  .wrapper {
    position: relative;
    z-index: -1;
  }

  .cube {
    position: absolute;
    top: var(--cubeTop);
    left: 0px;
    margin: 0 auto;
    width: var(--cardWidth);
    transform-style: preserve-3d;
    transform: perspective(50cm) rotateX(-1deg) rotateY(20deg);
    transition: all 1s linear;
  }

  .wall {
    position: absolute;
    background: rgba(255,255,255,0.1);
    box-shadow: inset 0 0 30px rgba(0,0,0,0.2);
    color: rgba(0,0,0,0.5);
    transition: all 1s linear;
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

  .bottom {
    top: var(--cardHeight);
    left: 0px;
    width: var(--cardWidth);
    height: var(--boxDepth);
    transform: rotateX(90deg);
    transform-origin: top center;
  }
</style>

{#if cardCount > 0}
  <div class="wrapper" use:cssVariables={{cubeTop}}>
    <div class="origin" />
    <div class="cube" use:cssVariables={{cardWidth, cardHeight}}>
      <div class="back wall" use:cssVariables={{cardWidth, cardHeight, boxDepth}} />
      <div class="bottom wall" use:cssVariables={{cardWidth, cardHeight, boxDepth}} />
      <div class="right wall" use:cssVariables={{cardWidth, cardHeight, boxDepth}} />
    </div>
  </div>
{/if}