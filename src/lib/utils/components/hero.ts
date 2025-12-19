/**
 * Lógica del componente Hero
 */

export const HERO_IMAGES = [
  '/images/chimborazo-01.jpg',
  '/images/chimborazo-02.jpg',
  '/images/chimborazo-03.jpg',
  '/images/chimborazo-04.jpg',
  '/images/chimborazo-05.jpg',
];

export function scrollToNextSection(): void {
  const nextSection = document.querySelector('.section-about');
  nextSection?.scrollIntoView({ behavior: 'smooth' });
}

// Función de utilidad para crear carrusel de imágenes (no utilizada actualmente)
// Se mantiene para uso futuro si es necesario
export function createImageCarousel(
  _currentIndex: number,
  _images: string[],
  _intervalMs: number = 5000
): () => void {
  return () => {
    // Función de limpieza vacía
  };
}
