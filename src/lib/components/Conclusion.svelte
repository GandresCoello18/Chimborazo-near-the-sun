<script lang="ts">
  import { CHIMBORAZO, EVEREST, EARTH_RADIUS_EQUATORIAL } from '../utils/constants';
  import SectionCTA from './SectionCTA.svelte';

  function getDistanceFromCenter(lat: number, heightMeters: number): number {
    const latRad = lat * (Math.PI / 180);
    const earthRadiusKm =
      EARTH_RADIUS_EQUATORIAL * (1 - 0.00335 * Math.sin(latRad) * Math.sin(latRad));
    const heightKm = heightMeters / 1000;
    return earthRadiusKm + heightKm;
  }

  const chimborazoDistance = getDistanceFromCenter(CHIMBORAZO.lat, CHIMBORAZO.height);
  const everestDistance = getDistanceFromCenter(EVEREST.lat, EVEREST.height);
  const distanceDifference = ((chimborazoDistance - everestDistance) * 1000).toFixed(0);
</script>

<section class="section-conclusion section">
  <div class="container">
    <div class="conclusion-content">
      <h2 class="section-title centered">La respuesta</h2>

      <div class="answer-box">
        <div class="answer-visual">
          <div class="comparison-visual">
            <div class="comparison-item">
              <div class="mountain-icon chimborazo-icon">🌋</div>
              <div class="mountain-info">
                <h3>Chimborazo</h3>
                <p class="mountain-height">6,263 m de altura</p>
                <p class="mountain-distance">Más lejos del centro</p>
                <p class="mountain-result highlight">✅ Más cerca del Sol</p>
              </div>
            </div>

            <div class="vs-divider">VS</div>

            <div class="comparison-item">
              <div class="mountain-icon everest-icon">🏔️</div>
              <div class="mountain-info">
                <h3>Everest</h3>
                <p class="mountain-height">8,848 m de altura</p>
                <p class="mountain-distance">Más cerca del centro</p>
                <p class="mountain-result">❌ Más lejos del Sol</p>
              </div>
            </div>
          </div>
        </div>

        <div class="answer-text">
          <p class="conclusion-text">
            <strong>Chimborazo está más cerca del Sol</strong> porque su ubicación cerca del ecuador
            lo coloca sobre el <strong>abultamiento de la Tierra</strong>, alejándolo del centro del
            planeta más de lo que su altura podría sugerir.
          </p>
          <p class="conclusion-text">
            Aunque el Everest es <strong>2,585 metros más alto</strong>, Chimborazo está
            <strong>{distanceDifference} metros más lejos del centro</strong>
            de la Tierra, lo que lo hace estar más cerca del Sol.
          </p>
        </div>
      </div>

      <div class="takeaway-box">
        <h3 class="takeaway-title">💡 Lo que aprendiste</h3>
        <ul class="takeaway-list">
          <li>La Tierra no es una esfera perfecta, tiene un abultamiento en el ecuador</li>
          <li>La distancia desde el centro de la Tierra determina qué tan cerca estás del Sol</li>
          <li>Chimborazo está más cerca del Sol que el Everest, a pesar de ser más bajo</li>
          <li>La ubicación geográfica puede ser más importante que la altura absoluta</li>
        </ul>
      </div>
    </div>
    <SectionCTA text="Volver al inicio" targetSelector=".hero" />
  </div>
</section>

<style>
  .section-conclusion {
    background: linear-gradient(180deg, #ffffff 0%, #f7fafc 100%);
  }

  .section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 6rem 2rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .conclusion-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .answer-box {
    margin: 3rem 0;
  }

  .answer-visual {
    margin-bottom: 3rem;
  }

  .comparison-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
    padding: 2rem;
    background: rgba(74, 144, 226, 0.05);
    border-radius: 20px;
  }

  .comparison-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    flex: 1;
    min-width: 200px;
  }

  .mountain-icon {
    font-size: 4rem;
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
  }

  .chimborazo-icon {
    animation: iconPulse 2s ease-in-out infinite;
  }

  @keyframes iconPulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .mountain-info {
    text-align: center;
  }

  .mountain-info h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 0.5rem;
  }

  .mountain-height {
    font-size: 1rem;
    color: #4a5568;
    margin-bottom: 0.3rem;
  }

  .mountain-distance {
    font-size: 0.9rem;
    color: #718096;
    margin-bottom: 0.5rem;
  }

  .mountain-result {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    background: rgba(74, 144, 226, 0.1);
    color: #2d3748;
  }

  .mountain-result.highlight {
    background: rgba(255, 200, 0, 0.2);
    color: #b8860b;
    border: 2px solid #ffc800;
  }

  .vs-divider {
    font-size: 1.8rem;
    font-weight: bold;
    color: #4a90e2;
    padding: 0 1rem;
  }

  .answer-text {
    background: rgba(74, 144, 226, 0.05);
    padding: 2.5rem;
    border-radius: 16px;
    border-left: 4px solid #4a90e2;
  }

  .conclusion-text {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.8;
    color: #2d3748;
    margin-bottom: 1.5rem;
  }

  .conclusion-text strong {
    color: #1a1a2e;
    font-weight: 700;
  }

  .takeaway-box {
    margin-top: 3rem;
    background: linear-gradient(135deg, rgba(255, 200, 0, 0.1) 0%, rgba(255, 200, 0, 0.05) 100%);
    padding: 2.5rem;
    border-radius: 16px;
    border: 2px solid rgba(255, 200, 0, 0.3);
  }

  .takeaway-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .takeaway-list {
    list-style: none;
    padding: 0;
    display: grid;
    gap: 1rem;
  }

  .takeaway-list li {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    font-size: 1rem;
    line-height: 1.6;
    color: #2d3748;
    border-left: 4px solid #ffc800;
  }

  @media (max-width: 768px) {
    .comparison-visual {
      flex-direction: column;
      gap: 2rem;
    }

    .vs-divider {
      transform: rotate(90deg);
    }

    .answer-text {
      padding: 1.5rem;
    }

    .takeaway-box {
      padding: 1.5rem;
    }
  }
</style>
