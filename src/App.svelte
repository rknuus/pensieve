<script>
  import Box from './Box/Box.svelte';
  import Stack from './Stack/Stack.svelte';
</script>

<style>
</style>

<Stack id="stackA" top="50" left="50" />
<Stack id="stackB" top="50" left="450" />
<Stack id="stackC" top="50" left="850" />

<Box id="boxA" selected={true} top="300" left="50" />
<Box id="boxB" top="300" left="450" />
<Box id="boxC" top="300" left="850" />