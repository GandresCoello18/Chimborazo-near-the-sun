# Chimborazo: El punto más cercano al Sol

Un proyecto educativo interactivo que explica por qué el volcán Chimborazo (Ecuador) está más cerca del Sol que el Monte Everest, a pesar de ser más bajo.

## 🎯 Propósito

Este proyecto demuestra visualmente cómo la forma oblata de la Tierra (abultamiento ecuatorial) hace que Chimborazo, ubicado cerca del ecuador, esté más lejos del centro de la Tierra y por lo tanto más cerca del Sol que el Everest.

## 🛠️ Tecnologías

- **Svelte** - Framework reactivo
- **Vite** - Build tool y dev server
- **CSS 3D Transforms** - Visualización 3D sin WebGL
- **TypeScript** - Tipado estático

## 📁 Estructura del Proyecto

```
src/
├── lib/
│   ├── components/          # Componentes de la landing page
│   │   ├── Hero.svelte
│   │   ├── AboutChimborazo.svelte
│   │   ├── Location.svelte
│   │   ├── WhySpecial.svelte
│   │   ├── PersonalExperience.svelte
│   │   ├── TheQuestion.svelte
│   │   ├── InteractiveDemo.svelte
│   │   ├── Conclusion.svelte
│   │   ├── Footer.svelte
│   │   └── SectionCTA.svelte
│   ├── scenes/              # Escenas 3D
│   │   ├── EarthScene.svelte
│   │   └── EarthSceneCSS.svelte
│   ├── styles/              # Estilos compartidos
│   │   ├── variables.css    # Variables CSS (design tokens)
│   │   ├── components.css   # Estilos de componentes base
│   │   └── animations.css  # Animaciones compartidas
│   └── utils/               # Utilidades
│       ├── constants.ts
│       ├── geo.ts
│       └── scrollReveal.ts
├── styles/
│   └── global.css           # Estilos globales
├── App.svelte
└── main.ts
```

## 🎨 Arquitectura y Buenas Prácticas

### Organización de Estilos

- **Variables CSS** (`lib/styles/variables.css`): Design tokens centralizados (colores, espaciados, tipografía)
- **Componentes Base** (`lib/styles/components.css`): Estilos compartidos para componentes comunes
- **Animaciones** (`lib/styles/animations.css`): Animaciones reutilizables
- **Estilos Scoped**: Cada componente mantiene estilos específicos en su bloque `<style>`

### Convenciones

- Uso de variables CSS para mantener consistencia
- Componentes modulares y reutilizables
- Separación de concerns (lógica, presentación, estilos)
- TypeScript para type safety
- Código semántico y accesible

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📝 Notas

- Las imágenes del hero deben colocarse en `public/images/`
- Las imágenes personales deben colocarse en `public/images/personal/`
- El proyecto usa CSS 3D para máxima compatibilidad (sin WebGL)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.
