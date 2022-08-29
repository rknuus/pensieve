<!--
This component takes a child component as a slot and displays it in a 3D perspective based on the
properties passed to this component.

IMPORTANT: All components in the slot having child HTML or component elements themselves must define
`transform-style: preserve-3d;` in the styles of their container elements, otherwise the 3D view
does not apply to their child elements.
-->

<script>
  import { cssVariables } from '../helpers/css-helpers.js';

  export let perspective = 0;
  export let rotateX = 0;
  export let rotateY = 0;
  export let rotateZ = 0;
  export let transform_origin = "50% 50% 0";
</script>

<style>
.view3d {
  transform-style: preserve-3d;
  transform: var(--perspective) rotateX(var(--rotateX)) rotateY(var(--rotateY)) rotateZ(var(--rotateZ));
  transform-origin: var(--transform_origin);
}
</style>

<div class="view3d" use:cssVariables={{perspective, rotateX, rotateY, rotateZ, transform_origin}}>
  <slot></slot>
</div>