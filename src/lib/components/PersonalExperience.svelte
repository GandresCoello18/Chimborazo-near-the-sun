<script lang="ts">
  import SectionCTA from './SectionCTA.svelte';
  import { EXPERIENCES } from '../utils/components/personalExperience';
  import '../styles/components/personalExperience.css';
</script>

<section class="section-personal section">
  <div class="container">
    <div class="personal-header">
      <h2 class="section-title centered">Mi experiencia con el Chimborazo</h2>
      <p class="personal-intro">
        Vivir cerca de esta maravilla natural me llena de felicidad, soy una persona que le gusta
        las cosas sencillas y lo natural y verde del campo, lugar donde es tranquilo y rodeado de
        animales.
      </p>
    </div>

    <div class="experiences-grid">
      {#each EXPERIENCES as experience, index}
        <div class="experience-card" style="animation-delay: {index * 0.1}s">
          <div class="video-container">
            <video
              src={experience.video}
              autoplay
              loop
              muted
              playsinline
              aria-label="Chimborazo - {experience.timeOfDay}"
            ></video>
            <div class="video-overlay">
              <span class="time-badge">{experience.timeOfDay}</span>
            </div>
          </div>
          <div class="experience-text">
            <p class="reflection-text">"{experience.text}"</p>
          </div>
        </div>
      {/each}
    </div>

    <div class="personal-closing">
      <p class="closing-text">
        El Chimborazo no es solo una montaña para mí. Es mi conpañero de trabajo, al salir de
        compras, al caminar por la ciudad, al visitar el campo, siempre me recuerda lo especial que
        es este lugar con sus areas verdes y sus animales.
      </p>
    </div>
    <SectionCTA text="Entender la paradoja" targetSelector=".section-question" />
  </div>
</section>
