/**
 * Datos y lógica del componente PersonalExperience
 */

export interface Experience {
  video: string;
  text: string;
  timeOfDay: string;
}

export const EXPERIENCES: Experience[] = [
  {
    video: '/videos/personal/chimborazo-01.mp4',
    text: 'Cada mañana me recuerda la grandeza de este volcán. Ver cómo la luz del sol toca su cumbre nevada es un espectáculo que nunca deja de asombrarme.',
    timeOfDay: 'Mediodía',
  },
  {
    video: '/videos/personal/chimborazo-02.mp4',
    text: 'La majestuosidad del Chimborazo se siente diferente en cada momento del día. Esta vista desde un viaje es un recordatorio constante de lo afortunado que soy.',
    timeOfDay: 'Mediodía',
  },
  {
    video: '/videos/personal/chimborazo-03.mp4',
    text: 'Al caer la tarde, las sombras juegan con las montañas creando un paisaje que parece sacado de un sueño. El Chimborazo domina el horizonte con su presencia imponente.',
    timeOfDay: 'Atardecer',
  },
  {
    video: '/videos/personal/chimborazo-04.mp4',
    text: 'Vivir cerca del Chimborazo no es solo tener una montaña cerca. Es tener un recordatorio diario de la belleza, la fuerza y la inmensidad de la naturaleza.',
    timeOfDay: 'Mediodía',
  },
  {
    video: '/videos/personal/chimborazo-05.mp4',
    text: 'Durante un viaje cotidiano, se vuevlve a ver el Chimborazo con un paisaje verde y animales de ganados disfrutando de la vista.',
    timeOfDay: 'Tarde',
  },
  {
    video: '/videos/personal/chimborazo-06.mp4',
    text: 'Una mañana despejada con un cielo azul intenso, se aprecia el volvan desde otro angulo pero con la misma impresion de su magnitud.',
    timeOfDay: 'Tarde',
  },
];

