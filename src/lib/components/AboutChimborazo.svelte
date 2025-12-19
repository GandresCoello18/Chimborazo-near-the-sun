<script lang="ts">
  import SectionCTA from './SectionCTA.svelte';
  import '../styles/components/aboutChimborazo.css';
</script>

<section class="section-about section">
  <div class="container">
    <div class="section-content">
      <div class="text-content">
        <h2 class="section-title">¿Qué es Chimborazo?</h2>
        <p class="section-text">
          Chimborazo es un volcán inactivo de <strong>6,263 metros</strong> de altura ubicado en
          <strong>Ecuador</strong>, en la majestuosa <strong>Cordillera de los Andes</strong>.
        </p>
        <p class="section-text">
          Aunque no es la montaña más alta sobre el nivel del mar, tiene una característica única
          que lo hace especial: su ubicación cerca del <strong>ecuador</strong>.
        </p>
        <div class="key-facts">
          <div class="fact-box">
            <div class="fact-number">6,263 m</div>
            <div class="fact-label">Altura sobre el nivel del mar</div>
          </div>
          <div class="fact-box highlight">
            <div class="fact-number">-1.47°</div>
            <div class="fact-label">Latitud (cerca del ecuador)</div>
          </div>
        </div>
      </div>
      <div class="visual-content">
        <div class="visualization-container">
          <div class="visualization-title">Chimborazo</div>
          <div class="earth-representation">
            <div class="earth-circle">
              <div class="equator-line"></div>
              <div class="equator-label">Ecuador</div>
            </div>
            <div class="volcano-marker">
              <div class="volcano-icon-simple">🌋</div>
              <div class="volcano-label">Chimborazo<br />6,263m</div>
            </div>
          </div>
          <div class="visualization-explanation">
            <p>Ubicado cerca del ecuador, donde la Tierra tiene su mayor diámetro</p>
          </div>
        </div>
      </div>
    </div>
    <SectionCTA text="Ver su ubicación" targetSelector=".section-location" />
  </div>
</section>
