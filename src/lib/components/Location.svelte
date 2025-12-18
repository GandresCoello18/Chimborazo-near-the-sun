<script lang="ts">
  import SectionCTA from './SectionCTA.svelte';
</script>

<section class="section-location section">
  <div class="container">
    <div class="section-content">
      <div class="visual-content">
        <div class="map-container">
          <svg viewBox="0 0 400 500" class="south-america-map">
            <!-- South America outline -->
            <path
              d="M 100 50 L 150 80 L 180 120 L 200 180 L 220 250 L 250 320 L 280 380 L 300 420 L 320 450 L 350 480 L 380 490 L 390 480 L 380 450 L 360 400 L 340 350 L 320 300 L 300 250 L 280 200 L 250 150 L 220 120 L 180 100 L 150 80 L 120 60 L 100 50 Z"
              fill="#4a90e2"
              opacity="0.3"
              stroke="#2d5aa0"
              stroke-width="2"
            />
            <!-- Ecuador highlight -->
            <circle cx="200" cy="200" r="25" fill="#ffc800" opacity="0.8" class="ecuador-marker">
              <animate
                attributeName="opacity"
                values="0.8;1;0.8"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <!-- Andes line -->
            <path
              d="M 150 100 Q 180 150 200 200 Q 220 250 250 300"
              fill="none"
              stroke="#8b4513"
              stroke-width="3"
              stroke-dasharray="5,5"
              opacity="0.6"
            />
            <!-- Labels -->
            <text x="200" y="195" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold"
              >Ecuador</text
            >
            <text
              x="200"
              y="175"
              text-anchor="middle"
              fill="#ffc800"
              font-size="10"
              font-weight="bold">Chimborazo</text
            >
          </svg>
        </div>
      </div>
      <div class="text-content">
        <h2 class="section-title">En el corazón de los Andes</h2>
        <p class="section-text">
          Chimborazo se encuentra en <strong>Ecuador</strong>, formando parte de la majestuosa
          <strong>Cordillera de los Andes</strong>, la cadena montañosa más larga del mundo.
        </p>
        <p class="section-text">
          Su ubicación cerca del <strong>ecuador</strong> es clave para entender por qué está más cerca
          del Sol que cualquier otra montaña.
        </p>
        <div class="location-facts">
          <div class="fact-item">
            <span class="fact-icon">🌍</span>
            <span class="fact-text">Latitud: -1.47° (cerca del ecuador)</span>
          </div>
          <div class="fact-item">
            <span class="fact-icon">🏔️</span>
            <span class="fact-text">Cordillera de los Andes</span>
          </div>
          <div class="fact-item">
            <span class="fact-icon">🇪🇨</span>
            <span class="fact-text">Ecuador, Sudamérica</span>
          </div>
        </div>
      </div>
    </div>
    <SectionCTA text="Descubre por qué es especial" targetSelector=".section-why" />
  </div>
</section>

<style>
  .section-location {
    background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  }

  .section-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-2xl);
    align-items: center;
  }

  .map-container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .south-america-map {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1));
  }

  .ecuador-marker {
    filter: drop-shadow(0 0 10px rgba(255, 200, 0, 0.8));
  }

  .location-facts {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .fact-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm);
    background: rgba(74, 144, 226, 0.1);
    border-radius: var(--radius-sm);
    border-left: 4px solid var(--color-primary);
  }

  .fact-icon {
    font-size: 1.5rem;
  }

  .fact-text {
    font-size: 1rem;
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
  }

  @media (max-width: 768px) {
    .section-content {
      grid-template-columns: 1fr;
    }

    .visual-content {
      order: -1;
    }
  }
</style>
