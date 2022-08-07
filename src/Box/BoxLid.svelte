<script>
  import { cssVariables } from '../helpers/css-helpers.js';

  export let top;
  export let left;
  export let width;
  export let height;
  export let depth;
</script>

<style>
  /* borrowed from https://davidwalsh.name/css-cube */
  .lid-box {
    position: absolute;
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--depth);
    z-index: -1;
    transform-style: preserve-3d;
  }

  .wall {
    position: absolute;
    background: DarkSlateGrey;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.3);
    color: rgba(0,0,0,0.5);
  }

 .top {
    top: 0px;
    left: 0px;
    width: var(--width);
    height: var(--depth);
    transform: rotateX(90deg);
    transform-origin: top center;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.7);
  }

  .back {
    top: 0px;
    left: 0px;
    width: var(--width);
    height: var(--height);
  }

  .right {
    top: 0px;
    left: var(--width);
    width: var(--depth);
    height: var(--height);
    transform: rotateY(-90deg);
    transform-origin: center left;
  }

  .front {
    top: 0px;
    left: 0px;
    width: var(--width);
    height: var(--height);
    transform: translateZ(var(--depth));
    border-style: solid;
    border-color: white;
    border-width: 1px;
  }

  .left {
    top: 0px;
    left: 0px;
    width: var(--depth);
    height: var(--height);
    transform: rotateY(-90deg);
    transform-origin: center left;
    border-style: solid;
    border-color: white;
    border-width: 1px;
  }
</style>

<div class="lid-box" use:cssVariables={{top, left, width, height}}>
  <div class="top wall" use:cssVariables={{top, left, width, height, depth}} />
  <div class="back wall" use:cssVariables={{top, left, width, height, depth}} />
  <div class="right wall" use:cssVariables={{top, left, width, height, depth}} />
   <div class="front wall" use:cssVariables={{top, left, width, height, depth}} />
  <div class="left wall" use:cssVariables={{top, left, width, height, depth}} />
</div>