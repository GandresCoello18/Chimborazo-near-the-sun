<script lang="ts">
  import SectionCTA from './SectionCTA.svelte';
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

<style>
  .section-about {
    background: var(--bg-primary);
  }

  .section-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-2xl);
    align-items: center;
  }

  .visual-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .key-facts {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .fact-box {
    flex: 1;
    min-width: 150px;
    padding: var(--spacing-md);
    background: rgba(74, 144, 226, 0.1);
    border-radius: var(--radius-md);
    border: 2px solid var(--border-primary);
    text-align: center;
  }

  .fact-box.highlight {
    background: var(--color-accent-light);
    border-color: var(--border-accent);
  }

  .fact-number {
    font-size: 1.8rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xs);
  }

  .fact-label {
    font-size: 0.9rem;
    color: var(--color-text-tertiary);
    font-weight: var(--font-weight-medium);
  }

  .visualization-container {
    width: 100%;
    max-width: 400px;
    padding: var(--spacing-lg);
    background: linear-gradient(
      135deg,
      rgba(74, 144, 226, 0.05) 0%,
      var(--color-accent-light) 100%
    );
    border-radius: var(--radius-xl);
    border: 2px solid var(--border-primary);
  }

  .visualization-title {
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    text-align: center;
    margin-bottom: var(--spacing-lg);
  }

  .earth-representation {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto 1.5rem;
  }

  .earth-circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(135deg, #4a90e2 0%, #2d5aa0 100%);
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .equator-line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 3px;
    background: #ffc800;
    transform: translateY(-50%);
    box-shadow: 0 0 10px rgba(255, 200, 0, 0.5);
  }

  .equator-label {
    position: absolute;
    top: 50%;
    right: -80px;
    transform: translateY(-50%);
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffc800;
    white-space: nowrap;
  }

  .volcano-marker {
    position: absolute;
    top: 45%;
    left: 60%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .volcano-icon-simple {
    font-size: 2.5rem;
    filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
    animation: volcanoFloat 3s ease-in-out infinite;
  }

  @keyframes volcanoFloat {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .volcano-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #1a1a2e;
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .visualization-explanation {
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    border-left: 4px solid #4a90e2;
  }

  .visualization-explanation p {
    font-size: 0.95rem;
    color: #2d3748;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    .section-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .visual-content {
      order: -1;
    }

    .earth-representation {
      width: 250px;
      height: 250px;
    }

    .equator-label {
      right: -60px;
      font-size: 0.8rem;
    }

    .key-facts {
      flex-direction: column;
    }
  }
</style>
