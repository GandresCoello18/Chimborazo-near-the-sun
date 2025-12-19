<script lang="ts">
  import SectionCTA from './SectionCTA.svelte';
  import { calculateDistanceDifference } from '../utils/components/conclusion';
  import '../styles/components/conclusion.css';

  const distanceDifference = calculateDistanceDifference();
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
