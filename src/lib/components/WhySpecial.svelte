<script lang="ts">
  import SectionCTA from './SectionCTA.svelte';
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

<style>
  .section-why {
    background: var(--bg-primary);
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
    max-width: 1000px;
    margin: 0 auto;
  }

  .feature-card {
    background: var(--bg-primary);
    border: 2px solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: 2.5rem var(--spacing-lg);
    text-align: center;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-sm);
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }

  .feature-card.highlight {
    border-color: var(--color-accent);
    background: linear-gradient(135deg, var(--color-accent-light) 0%, rgba(255, 200, 0, 0.02) 100%);
  }

  .card-icon {
    font-size: 3.5rem;
    margin-bottom: var(--spacing-md);
    display: block;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
  }

  .card-text {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--color-text-tertiary);
  }

  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: 1fr;
    }

    .feature-card {
      padding: 2rem 1.5rem;
    }
  }
</style>
