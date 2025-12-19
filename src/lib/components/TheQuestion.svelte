<script lang="ts">
  import SectionCTA from './SectionCTA.svelte';
  import '../styles/components/theQuestion.css';
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
