export const SEO_CONFIG = {
  siteUrl: 'https://chimborazo-education.vercel.app',
  siteName: 'Chimborazo Education',
  title: 'Chimborazo: El punto más cercano al Sol',
  description:
    'Aunque el Everest sea más alto, hay un lugar en la Tierra que está más cerca del Sol. Descubre por qué el volcán Chimborazo en Ecuador es el punto más cercano al Sol.',

  ogImage: '/images/chimborazo-01.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,

  author: 'Andrés Coello Goyes',

  geo: {
    region: 'EC',
    placename: 'Chimborazo, Ecuador',
    position: '-1.4692;-78.8175',
    icbm: '-1.4692, -78.8175',
  },

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
    'Andes',
  ].join(', '),
};

export function getAbsoluteUrl(path: string): string {
  return `${SEO_CONFIG.siteUrl}${path}`;
}
