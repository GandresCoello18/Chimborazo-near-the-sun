# Configuración SEO

Este proyecto incluye configuración completa de SEO y Open Graph para mejorar la visibilidad en motores de búsqueda y redes sociales.

## 📋 Archivos de Configuración

### 1. `index.html`
Contiene todos los meta tags principales:
- Meta tags de SEO (description, keywords, author)
- Open Graph tags (Facebook, LinkedIn, etc.)
- Twitter Card tags
- Canonical URL
- Geo tags

### 2. `src/lib/config/seo.ts`
Archivo de configuración centralizado donde puedes actualizar:
- URL del sitio (`siteUrl`)
- Título y descripción
- Imagen para Open Graph
- Información del autor
- Coordenadas geográficas

### 3. `public/robots.txt`
Instrucciones para los crawlers de los motores de búsqueda.

### 4. `public/sitemap.xml`
Mapa del sitio para ayudar a los motores de búsqueda a indexar el contenido.

### 5. `src/lib/components/StructuredData.svelte`
Componente que agrega datos estructurados (JSON-LD) para mejorar el SEO.

## 🔧 Actualizar URLs para Producción

Cuando despliegues el sitio, actualiza las siguientes URLs:

### 1. En `index.html`:
```html
<!-- Cambiar estas URLs -->
<meta property="og:url" content="TU_URL_AQUI" />
<meta name="twitter:url" content="TU_URL_AQUI" />
<link rel="canonical" href="TU_URL_AQUI" />
```

### 2. En `src/lib/config/seo.ts`:
```typescript
export const SEO_CONFIG = {
  siteUrl: 'TU_URL_AQUI', // Actualizar aquí
  // ... resto de la configuración
};
```

### 3. En `public/robots.txt`:
```
Sitemap: TU_URL_AQUI/sitemap.xml
```

### 4. En `public/sitemap.xml`:
```xml
<loc>TU_URL_AQUI</loc>
```

## 🖼️ Imagen de Open Graph

La imagen de Open Graph debe cumplir con estos requisitos:
- **Tamaño recomendado**: 1200x630 píxeles
- **Formato**: JPG o PNG
- **Ubicación**: `/public/images/chimborazo-01.jpg`
- **URL absoluta**: Debe ser accesible públicamente

Puedes usar herramientas como:
- [Open Graph Image Generator](https://www.opengraph.xyz/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) para probar

## ✅ Verificar Configuración

### Herramientas de Validación:

1. **Open Graph (Facebook)**:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Ingresa tu URL y verifica que se muestre correctamente

2. **Twitter Cards**:
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - Ingresa tu URL y verifica la preview

3. **Datos Estructurados (Google)**:
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Ingresa tu URL y verifica los datos estructurados

4. **SEO General**:
   - [Google Search Console](https://search.google.com/search-console)
   - [Lighthouse](https://developers.google.com/web/tools/lighthouse) (incluido en Chrome DevTools)

## 📊 Meta Tags Incluidos

### SEO Básico:
- `title`: Título de la página
- `description`: Descripción para resultados de búsqueda
- `keywords`: Palabras clave relevantes
- `author`: Autor del sitio
- `robots`: Instrucciones para crawlers
- `canonical`: URL canónica

### Open Graph:
- `og:type`: Tipo de contenido (website)
- `og:url`: URL del sitio
- `og:title`: Título para compartir
- `og:description`: Descripción para compartir
- `og:image`: Imagen para compartir
- `og:locale`: Idioma (es_ES)

### Twitter Card:
- `twitter:card`: Tipo de tarjeta (summary_large_image)
- `twitter:title`: Título
- `twitter:description`: Descripción
- `twitter:image`: Imagen

### Geo Tags:
- `geo.region`: Región (EC para Ecuador)
- `geo.placename`: Nombre del lugar
- `geo.position`: Coordenadas GPS
- `ICBM`: Coordenadas ICBM

## 🚀 Mejores Prácticas

1. **Actualiza las URLs** antes de desplegar
2. **Verifica las imágenes** de Open Graph antes de compartir
3. **Usa URLs absolutas** para todas las imágenes de Open Graph
4. **Mantén el sitemap actualizado** cuando agregues nuevas páginas
5. **Revisa periódicamente** con las herramientas de validación

## 📝 Notas

- Los datos estructurados (JSON-LD) se insertan dinámicamente cuando se carga la página
- La imagen de Open Graph debe existir en `/public/images/chimborazo-01.jpg`
- El sitemap actual solo incluye la página principal (puedes expandirlo si agregas más páginas)

