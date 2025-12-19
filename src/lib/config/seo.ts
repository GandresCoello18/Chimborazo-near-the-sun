/**
 * Configuración SEO y Open Graph
 * Actualiza estas URLs cuando despliegues el sitio en producción
 */

export const SEO_CONFIG = {
  // URL base del sitio (actualizar cuando despliegues)
  siteUrl: 'https://chimborazo-education.vercel.app',
  
  // Información del sitio
  siteName: 'Chimborazo Education',
  title: 'Chimborazo: El punto más cercano al Sol',
  description: 'Aunque el Everest sea más alto, hay un lugar en la Tierra que está más cerca del Sol. Descubre por qué el volcán Chimborazo en Ecuador es el punto más cercano al Sol.',
  
  // Imagen para Open Graph (debe ser absoluta)
  ogImage: '/images/chimborazo-01.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  
  // Autor
  author: 'Andrés Coello Goyes',
  
  // Ubicación geográfica
  geo: {
    region: 'EC',
    placename: 'Chimborazo, Ecuador',
    position: '-1.4692;-78.8175',
    icbm: '-1.4692, -78.8175'
  },
  
  // Keywords
  keywords: [
    'Chimborazo',
    'volcán',
    'Ecuador',
    'punto más cercano al sol',
    'Everest',
    'forma oblata de la Tierra',
    'geografía',
    'educación',
    'visualización 3D',
    'Andes'
  ].join(', ')
};

/**
 * Genera una URL absoluta para Open Graph
 */
export function getAbsoluteUrl(path: string): string {
  return `${SEO_CONFIG.siteUrl}${path}`;
}

