<script>
  import { cssVariables } from '../helpers/css-helpers.js';

  export let name;
  export let top;
  export let left;
  export let width;
  export let height;
  export let depth;
  export let selected = false;

  $: labelTop = height * 0.25;
  $: labelWidth = width * 0.5;
  $: labelHeight = height * 0.6;
  $: labelLeft = (width - labelWidth) / 2;
  $: labelBorderRadius = labelWidth * 0.12;
</script>

<style>
  /* borrowed from https://davidwalsh.name/css-cube */
  .body-box {
    position: absolute;
    top: var(--top);
    left: var(--left);
    width: var(--width);
    height: var(--depth);
    transform-style: preserve-3d;
  }

  .wall {
    position: absolute;
    background: DarkSlateGrey;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.3);
    color: rgba(0,0,0,0.5);
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
    /*transform-style: preserve-3d;*/
    border-style: solid none none solid;
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
    border-style: solid solid none none;
    border-color: white;
    border-width: 1px;
  }

 .bottom {
    top: var(--height);
    left: 0px;
    width: var(--width);
    height: var(--depth);
    transform: rotateX(90deg);
    transform-origin: top center;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.7);
  }

  .box-label {
    position: absolute;
    top: var(--labelTop);
    left: var(--labelLeft);
    width: var(--labelWidth);
    height: var(--labelHeight);
    background-color: white;
    border-radius: var(--labelBorderRadius);
  }

  .box-label p {
    margin: 5px;
  }

  .selected {
    background: rgba(0,0,70,0.7);
  }
</style>

<div class="body-box" use:cssVariables={{top, left, width, height}}>
  <div class="back wall" class:selected use:cssVariables={{top, left, width, height, depth}} />
  <div class="right wall" class:selected use:cssVariables={{top, left, width, height, depth}} />
  <div class="front wall" class:selected use:cssVariables={{top, left, width, height, depth}}>
    <div class="box-label" use:cssVariables={{labelTop, labelLeft, labelWidth, labelHeight, labelBorderRadius}}><p>{name}</p></div>
  </div>
  <div class="left wall" class:selected use:cssVariables={{top, left, width, height, depth}} />
  <div class="bottom wall" class:selected use:cssVariables={{top, left, width, height, depth}} />
</div>