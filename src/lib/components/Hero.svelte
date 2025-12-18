<script lang="ts">
  import { onMount } from 'svelte';

  let currentImageIndex = 0;
  let imageElement: HTMLDivElement;

  const heroImages = [
    'https://images.unsplash.com/photo-1708502784969-edecf4cdfdff', // Montaña/volcán
    'https://images.unsplash.com/photo-1694371390016-4e63941aec13', // Paisaje montañoso
    'https://images.unsplash.com/photo-1649286184088-0b99e8afd509', // Montañas con cielo
    'https://images.unsplash.com/photo-1578580896025-a6ab6881d54f',
    'https://images.unsplash.com/photo-1708502784728-f6598b33bfaa',
  ];

  // Alternativa: Usar imágenes locales (descomenta y ajusta las rutas)
  // const heroImages = [
  //   '/images/chimborazo-1.jpg',
  //   '/images/chimborazo-2.jpg',
  //   '/images/chimborazo-3.jpg',
  // ];

  function scrollToNext() {
    const nextSection = document.querySelector('.section-about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  }

  onMount(() => {
    // Cambiar imagen cada 5 segundos
    const interval = setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % heroImages.length;
    }, 5000);

    return () => clearInterval(interval);
  });
</script>

<section class="hero">
  <div class="hero-background" bind:this={imageElement}>
    {#each heroImages as image, index}
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
    <button class="hero-cta" on:click={scrollToNext}>
      Explorar
      <span class="arrow">↓</span>
    </button>
  </div>
</section>

<style>
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .hero-bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
  }

  .hero-bg-image.active {
    opacity: 1;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(26, 26, 46, 0.7) 0%,
      rgba(45, 55, 72, 0.6) 50%,
      rgba(26, 26, 46, 0.8) 100%
    );
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: #fff;
    max-width: 800px;
    padding: 2rem;
    animation: fadeInUp 1s ease-out;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-title {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }

  .hero-subtitle {
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    margin-bottom: 3rem;
    line-height: 1.6;
    opacity: 0.95;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  }

  .hero-cta {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-shadow: none;
  }

  .hero-cta:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }

  .arrow {
    display: inline-block;
    animation: bounce 2s ease-in-out infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
  }

  @media (max-width: 768px) {
    .hero-content {
      padding: 1rem;
    }

    .hero-title {
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      margin-bottom: 2rem;
    }
  }
</style>
