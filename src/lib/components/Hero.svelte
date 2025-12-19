<script lang="ts">
  import { onMount } from 'svelte';
  import { HERO_IMAGES, scrollToNextSection } from '../utils/components/hero';
  import '../styles/components/hero.css';

  let currentImageIndex = 0;
  let imageElement: HTMLDivElement;

  onMount(() => {
    const interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % HERO_IMAGES.length;
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<section class="hero">
  <div class="hero-background" bind:this={imageElement}>
    {#each HERO_IMAGES as image, index}
      <div
        class="hero-bg-image"
        class:active={index === currentImageIndex}
        style="background-image: url('{image}');"
        role="img"
        aria-label="Imagen del Chimborazo"
      ></div>
    {/each}
    <div class="hero-overlay"></div>
  </div>

  <div class="hero-content">
    <h1 class="hero-title">Chimborazo: El punto más cercano al Sol</h1>
    <p class="hero-subtitle">
      Aunque el Everest sea más alto, hay un lugar en la Tierra que está más cerca del Sol.
      <br />
      <strong>Descubre por qué.</strong>
    </p>
    <button class="hero-cta" on:click={scrollToNextSection}>
      Explorar
      <span class="arrow">↓</span>
    </button>
  </div>
</section>
