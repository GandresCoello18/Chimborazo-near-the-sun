<script lang="ts">
  import { onMount } from 'svelte';
  import { SEO_CONFIG } from '../config/seo';
  import { getAbsoluteUrl } from '../config/seo';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.description,
    author: {
      '@type': 'Person',
      name: SEO_CONFIG.author,
    },
    inLanguage: 'es-ES',
    potentialAction: {
      '@type': 'ReadAction',
      target: SEO_CONFIG.siteUrl,
    },
  };

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    image: getAbsoluteUrl(SEO_CONFIG.ogImage),
    author: {
      '@type': 'Person',
      name: SEO_CONFIG.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SEO_CONFIG.siteUrl,
    },
    about: {
      '@type': 'Place',
      name: 'Volcán Chimborazo',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -1.4692,
        longitude: -78.8175,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chimborazo',
        addressCountry: 'EC',
      },
    },
  };

  onMount(() => {
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.textContent = JSON.stringify(articleStructuredData);
    document.head.appendChild(script2);
  });
</script>
