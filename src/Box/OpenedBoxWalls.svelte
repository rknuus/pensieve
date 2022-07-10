<script>
  import { cssVariables } from '../helpers/css-helpers.js';
  import { getCardOffset, getCardWidth, getCardHeight, getHeight  } from '../helpers/display-helpers.js';

  export let top;
  export let left;
  export let cardCount;
  let width;
  let height;

  // For boxes with a single card the floor and the right side-wall would be too small, so pretend
  // one more card. And for boxes with more cares we don't care, so do not treat a single card box
  // as a special case.
  $: capacity = (cardCount + 1) * 10;

  $: cubeTop = getCardHeight() + 'px';
</script>

<style>
/* borrowed from https://davidwalsh.name/css-cube */
/* scene wrapper */
.wrapper{
  height: 300px;
  position:relative;
  perspective: 800;
  perspective-origin: top;  /* TODO(KNR): does not seem to have an effect I can notice */
  z-index: -1;
}

.cube{
  position: absolute;
  top: var(--cubeTop);
  left: 0px;
  margin: 0 auto;
  width: 200px;
  transform-style: preserve-3d;
  transform: perspective(50cm) rotateX(-1deg) rotateY(20deg);
  transition: all 1s linear;
}

.wall{
  position:absolute;
  background:rgba(255,255,255,0.1);
  box-shadow:inset 0 0 30px rgba(0,0,0,0.2);
  font-size:20px;
  text-align:center;
  color:rgba(0,0,0,0.5);
  font-family:sans-serif;
  text-transform:uppercase;
  transition: all 1s linear;
}
.back{
  top: 0px;
  left: 0px;
  width:200px;
  height:112px;
  line-height:112px;
}
.right{
  top: 0px;
  left: 200px;
  width:50px;
  height:112px;
  line-height:112px;
  transform:rotateY(-90deg);
  transform-origin: center left;
}
.bottom{
  top: 112px;
  left: 0px;
  width:200px;
  height:50px;
  line-height:50px;
  transform:rotateX(90deg);
  transform-origin: top center;
}
</style>

{#if cardCount > 0}
  <div class="wrapper" use:cssVariables={{cubeTop}}>
    <div class="origin" />
    <div class="cube">
      <div class="back wall" />
      <div class="bottom wall" />
      <div class="right wall" />
    </div>
  </div>
{/if}