<script lang="ts">
  import EarthScene from './lib/scenes/EarthScene.svelte';
</script>

<main>
  <EarthScene />
</main>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  main {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #0a0a0a;
  }
</style>

