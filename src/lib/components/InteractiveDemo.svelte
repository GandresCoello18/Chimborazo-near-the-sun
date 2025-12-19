<script lang="ts">
  import EarthSceneCSS from '../scenes/EarthSceneCSS.svelte';
  import '../styles/components/interactiveDemo.css';
</script>

<section class="section-demo section">
  <div class="container">
    <div class="demo-header">
      <h2 class="section-title centered" style="color: #fff">Explora la Tierra en 3D</h2>
      <p class="demo-intro">
        Interactúa con esta visualización para ver cómo la forma de la Tierra afecta la distancia
        desde el centro hasta cada montaña.
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
        Chimborazo está más lejos del centro debido a su ubicación cerca del ecuador, donde la
        Tierra tiene su abultamiento máximo.
      </p>
    </div>
  </div>
</section>
