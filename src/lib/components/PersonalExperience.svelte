<script lang="ts">
  import SectionCTA from './SectionCTA.svelte';
  
  const experiences = [
    {
      video: '/videos/personal/chimborazo-01.mp4',
      text: 'Cada mañana me recuerda la grandeza de este volcán. Ver cómo la luz del sol toca su cumbre nevada es un espectáculo que nunca deja de asombrarme.',
      timeOfDay: 'Mediodía'
    },
    {
      video: '/videos/personal/chimborazo-02.mp4',
      text: 'La majestuosidad del Chimborazo se siente diferente en cada momento del día. Esta vista desde un viaje es un recordatorio constante de lo afortunado que soy.',
      timeOfDay: 'Mediodía'
    },
    {
      video: '/videos/personal/chimborazo-03.mp4',
      text: 'Al caer la tarde, las sombras juegan con las montañas creando un paisaje que parece sacado de un sueño. El Chimborazo domina el horizonte con su presencia imponente.',
      timeOfDay: 'Atardecer'
    },
    {
      video: '/videos/personal/chimborazo-04.mp4',
      text: 'Vivir cerca del Chimborazo no es solo tener una montaña cerca. Es tener un recordatorio diario de la belleza, la fuerza y la inmensidad de la naturaleza.',
      timeOfDay: 'Mediodía'
    },
    {
      video: '/videos/personal/chimborazo-05.mp4',
      text: 'Durante un viaje cotidiano, se vuevlve a ver el Chimborazo con un paisaje verde y animales de ganados disfrutando de la vista.',
      timeOfDay: 'Tarde'
    },
    {
      video: '/videos/personal/chimborazo-06.mp4',
      text: 'Una mañana despejada con un cielo azul intenso, se aprecia el volvan desde otro angulo pero con la misma impresion de su magnitud.',
      timeOfDay: 'Tarde'
    }
  ];
</script>

<section class="section-personal section">
  <div class="container">
    <div class="personal-header">
      <h2 class="section-title centered">Mi experiencia con el Chimborazo</h2>
      <p class="personal-intro">
        Vivir cerca de esta maravilla natural ha sido una de las mayores bendiciones de mi vida. 
        Cada día, desde diferentes ángulos y en distintas horas, el Chimborazo me recuerda la 
        inmensidad del mundo y mi lugar en él.
      </p>
    </div>

    <div class="experiences-grid">
      {#each experiences as experience, index}
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
        El Chimborazo no es solo una montaña para mí. Es mi conpañero de trabajo, al salir de compras, al caminar por la ciudad, al visitar el campo, siempre me recuerda lo especial que es este lugar con sus areas verdes y sus animales.
      </p>
    </div>
    <SectionCTA text="Entender la paradoja" targetSelector=".section-question" />
  </div>
</section>

<style>
  .section-personal {
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

  .personal-header {
    max-width: 800px;
    margin: 0 auto 4rem;
    text-align: center;
  }

  .section-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  .centered {
    text-align: center;
  }

  .personal-intro {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.8;
    color: #4a5568;
    font-style: italic;
  }

  .experiences-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
    margin-bottom: 4rem;
  }

  .experience-card {
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .experience-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .video-container {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
  }

  .video-container video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    pointer-events: none; /* Evita interacción con el video */
  }

  .experience-card:hover .video-container video {
    transform: scale(1.1);
  }

  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none; /* Permite que el overlay no interfiera */
  }

  .experience-card:hover .video-overlay {
    opacity: 1;
  }

  .time-badge {
    background: rgba(255, 255, 255, 0.95);
    color: #1a1a2e;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    backdrop-filter: blur(10px);
  }

  .experience-text {
    padding: 2rem;
  }

  .reflection-text {
    font-size: 1rem;
    line-height: 1.8;
    color: #4a5568;
    font-style: italic;
    margin: 0;
    position: relative;
    padding-left: 1.5rem;
  }

  .reflection-text::before {
    content: '"';
    position: absolute;
    left: 0;
    top: -0.5rem;
    font-size: 3rem;
    color: #4a90e2;
    opacity: 0.3;
    font-family: Georgia, serif;
  }

  .personal-closing {
    max-width: 700px;
    margin: 4rem auto 0;
    text-align: center;
    padding: 3rem;
    background: linear-gradient(135deg, rgba(74, 144, 226, 0.05) 0%, rgba(255, 200, 0, 0.05) 100%);
    border-radius: 20px;
    border: 2px solid rgba(74, 144, 226, 0.1);
  }

  .closing-text {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.8;
    color: #1a1a2e;
    font-weight: 500;
    margin: 0;
  }

  @media (max-width: 768px) {
    .experiences-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .video-container {
      height: 250px;
    }

    .experience-text {
      padding: 1.5rem;
    }

    .personal-closing {
      padding: 2rem 1.5rem;
      margin-top: 3rem;
    }
  }
</style>

