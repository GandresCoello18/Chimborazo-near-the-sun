<script lang="ts">
  import EarthSceneCSS from '../scenes/EarthSceneCSS.svelte';
</script>

<section class="section-demo section">
  <div class="container">
    <div class="demo-header">
      <h2 class="section-title centered">Explora la Tierra en 3D</h2>
      <p class="demo-intro">
        Interactúa con esta visualización para ver cómo la forma de la Tierra afecta 
        la distancia desde el centro hasta cada montaña.
      </p>
      <div class="demo-instructions">
        <div class="instruction-item">
          <span class="instruction-icon">🖱️</span>
          <span>Arrastra para rotar</span>
        </div>
        <div class="instruction-item">
          <span class="instruction-icon">🔍</span>
          <span>Rueda del mouse para zoom</span>
        </div>
        <div class="instruction-item">
          <span class="instruction-icon">👆</span>
          <span>Click en los volcanes</span>
        </div>
      </div>
    </div>
    
    <div class="demo-container">
      <EarthSceneCSS />
    </div>
    
    <div class="demo-caption">
      <p>
        Observa cómo las líneas radiales muestran la distancia desde el centro de la Tierra. 
        Chimborazo está más lejos del centro debido a su ubicación cerca del ecuador, 
        donde la Tierra tiene su abultamiento máximo.
      </p>
    </div>
  </div>
</section>

<style>
  .section-demo {
    background: #0a0a0a;
    padding: 0;
    min-height: 100vh;
  }
  
  .container {
    max-width: 100%;
    margin: 0;
  }
  
  .demo-header {
    padding: 4rem 2rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }
  
  .section-title {
    color: #fff;
    margin-bottom: 1.5rem;
  }
  
  .demo-intro {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .demo-instructions {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }
  
  .instruction-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 20px;
  }
  
  .instruction-icon {
    font-size: 1.2rem;
  }
  
  .demo-container {
    width: 100%;
    height: 80vh;
    min-height: 600px;
    position: relative;
    z-index: 1;
    overflow: visible;
  }
  
  .demo-caption {
    padding: 3rem 2rem 4rem;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2000;
    margin-top: -2rem;
  }
  
  .demo-caption p {
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.7;
    background: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(10px);
    padding: 1.5rem 2rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    margin: 0;
  }
  
  @media (max-width: 768px) {
    .demo-header {
      padding: 2rem 1rem 1rem;
    }
    
    .demo-instructions {
      flex-direction: column;
      gap: 1rem;
    }
    
    .demo-container {
      height: 70vh;
      min-height: 500px;
    }
  }
</style>

