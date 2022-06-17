<script>
  import Box from './Box/Box.svelte';
  import Stack from './Stack/Stack.svelte';
</script>

<style>
</style>

<Stack id="stackA" --top="50px" --left="50px" />
<Stack id="stackB" --top="50px" --left="450px"  />
<Stack id="stackC" --top="50px" --left="850px"  />

<Box id="boxA" --top="250px" --left="50px" />
<Box id="boxB" --top="250px" --left="450px"  />
<Box id="boxC" --top="250px" --left="850px"  />