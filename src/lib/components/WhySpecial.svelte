<script lang="ts">
  import SectionCTA from './SectionCTA.svelte';
  import '../styles/components/whySpecial.css';
</script>

<section class="section-why section">
  <div class="container">
    <h2 class="section-title centered">Tres razones que lo hacen único</h2>
    <div class="cards-grid">
      <div class="feature-card">
        <div class="card-icon">🌍</div>
        <h3 class="card-title">Ubicación Ecuatorial</h3>
        <p class="card-text">
          Está ubicado muy cerca del ecuador, donde la Tierra tiene su mayor diámetro debido al
          abultamiento.
        </p>
      </div>

      <div class="feature-card highlight">
        <div class="card-icon">🔵</div>
        <h3 class="card-title">Forma de la Tierra</h3>
        <p class="card-text">
          La Tierra no es una esfera perfecta. Tiene un abultamiento en el ecuador que la hace más
          "gorda" en esa zona.
        </p>
      </div>

      <div class="feature-card">
        <div class="card-icon">🏔️</div>
        <h3 class="card-title">Altura Significativa</h3>
        <p class="card-text">
          Con 6,263 metros de altura, es uno de los picos más altos de los Andes y del mundo.
        </p>
      </div>
    </div>
    <SectionCTA text="Conoce mi experiencia" targetSelector=".section-personal" />
  </div>
</section>
