<script lang="ts">
  import SectionCTA from './SectionCTA.svelte';
</script>

<section class="section-question section">
  <div class="container">
    <div class="question-content">
      <h2 class="question-title">
        Si el Everest es más alto...<br />
        <span class="question-highlight">¿por qué Chimborazo está más cerca del Sol?</span>
      </h2>

      <div class="explanation-box">
        <p class="explanation-text">
          La respuesta está en la <strong>forma de la Tierra</strong>. Nuestro planeta no es una
          esfera perfecta.
        </p>
        <p class="explanation-text">
          Debido a su rotación, la Tierra tiene un <strong>abultamiento en el ecuador</strong>,
          haciendo que sea más "gorda" en esa zona y más "delgada" en los polos.
        </p>
      </div>

      <div class="visual-comparison">
        <div class="shape-item">
          <div class="shape perfect-sphere"></div>
          <p class="shape-label">Esfera perfecta<br />(no es así)</p>
        </div>
        <div class="arrow-between">→</div>
        <div class="shape-item">
          <div class="shape oblate-spheroid"></div>
          <p class="shape-label">Esferoide oblato<br />(forma real)</p>
        </div>
      </div>

      <p class="conclusion-preview">
        Esto significa que los puntos cerca del ecuador están <strong>más lejos del centro</strong>
        de la Tierra, y por lo tanto, <strong>más cerca del Sol</strong>.
      </p>
    </div>
    <SectionCTA text="Explorar en 3D" targetSelector=".section-demo" />
  </div>
</section>

<style>
  .section-question {
    background: linear-gradient(180deg, #f7fafc 0%, #edf2f7 100%);
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

  .question-content {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .question-title {
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 800;
    margin-bottom: 3rem;
    line-height: 1.3;
    color: #1a1a2e;
  }

  .question-highlight {
    color: #4a90e2;
    font-weight: 800;
  }

  .explanation-box {
    background: rgba(74, 144, 226, 0.1);
    border-radius: 20px;
    padding: 2.5rem;
    margin: 3rem 0;
    border: 2px solid rgba(74, 144, 226, 0.2);
    border-left: 4px solid #4a90e2;
  }

  .explanation-text {
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    line-height: 1.8;
    margin-bottom: 1rem;
    color: #4a5568;
  }

  .explanation-text strong {
    color: #1a1a2e;
    font-weight: 700;
  }

  .visual-comparison {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    margin: 3rem 0;
    flex-wrap: wrap;
  }

  .shape-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .shape {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 3px solid #e2e8f0;
    background: #ffffff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .perfect-sphere {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
  }

  .oblate-spheroid {
    transform: scaleY(0.85);
    background: linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(74, 144, 226, 0.1) 100%);
    border-color: #4a90e2;
  }

  .shape-label {
    font-size: 0.9rem;
    color: #4a5568;
    font-weight: 500;
  }

  .arrow-between {
    font-size: 2rem;
    color: #4a90e2;
    font-weight: bold;
  }

  .conclusion-preview {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    line-height: 1.8;
    margin-top: 3rem;
    color: #4a5568;
  }

  .conclusion-preview strong {
    color: #1a1a2e;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .visual-comparison {
      gap: 2rem;
    }

    .shape {
      width: 120px;
      height: 120px;
    }

    .arrow-between {
      transform: rotate(90deg);
    }

    .explanation-box {
      padding: 1.5rem;
    }
  }
</style>
