<script>
  import Box from './Box/Box.svelte';
  import Stack from './Stack/Stack.svelte';
</script>

<style>
</style>

<Stack id="stackA" --top="50px" --left="50px" />
<Stack id="stackB" --top="50px" --left="450px" />
<Stack id="stackC" --top="50px" --left="850px" />

<Box id="boxA" selected={true} top="300" left="50" />
<Box id="boxB" top="300" left="450" />
<Box id="boxC" top="300" left="850" />