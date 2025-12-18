# Arquitectura y Buenas Prácticas

## 📐 Estructura del Proyecto

Este proyecto sigue una arquitectura modular y escalable, separando concerns y aplicando principios SOLID.

### Organización de Carpetas

```
src/
├── lib/                    # Código reutilizable
│   ├── components/         # Componentes UI
│   ├── scenes/            # Escenas 3D complejas
│   ├── styles/            # Estilos compartidos
│   └── utils/             # Utilidades y helpers
├── styles/                # Estilos globales
└── App.svelte             # Componente raíz
```

## 🎨 Sistema de Diseño

### Variables CSS (Design Tokens)

Todas las variables de diseño están centralizadas en `lib/styles/variables.css`:

- **Colores**: Paleta consistente con variantes (primary, accent, text, background)
- **Espaciados**: Sistema de espaciado escalable
- **Tipografía**: Fuentes, pesos y tamaños
- **Sombras**: Sistema de elevación
- **Transiciones**: Duraciones y easings consistentes

### Uso de Variables

```css
/* ❌ Mal - Valores hardcodeados */
.button {
  background: #4a90e2;
  padding: 1rem 2rem;
  border-radius: 50px;
}

/* ✅ Bien - Usando variables */
.button {
  background: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
}
```

## 🧩 Componentes

### Estructura de Componentes

Cada componente sigue esta estructura:

```svelte
<script lang="ts">
  // 1. Imports
  // 2. Props/Exports
  // 3. Estado local
  // 4. Funciones
</script>

<!-- 5. Template HTML -->

<style>
  /* 6. Estilos scoped */
  /* Usar variables CSS cuando sea posible */
</style>
```

### Principios de Componentes

1. **Single Responsibility**: Cada componente tiene una responsabilidad única
2. **Reusabilidad**: Componentes reutilizables (ej: `SectionCTA`)
3. **Composición**: Componentes pequeños que se combinan
4. **Props Tipadas**: TypeScript para type safety

## 🎭 Estilos

### Jerarquía de Estilos

1. **Global** (`styles/global.css`): Reset, base, imports
2. **Shared** (`lib/styles/`): Variables, componentes base, animaciones
3. **Component** (`<style>` en componentes): Estilos específicos scoped

### Reglas de Estilos

- ✅ Usar variables CSS para valores repetidos
- ✅ Mantener estilos scoped en componentes
- ✅ Extraer estilos comunes a `components.css`
- ✅ Usar clases semánticas
- ❌ Evitar valores mágicos (números sin contexto)
- ❌ Evitar duplicación de estilos

## 🔧 Utilidades

### Organización de Utils

- `constants.ts`: Constantes de la aplicación (datos, configuraciones)
- `geo.ts`: Funciones de cálculo geográfico
- `scrollReveal.ts`: Utilidades de animación

### Convenciones

- Funciones puras cuando sea posible
- TypeScript para type safety
- Documentación JSDoc para funciones complejas

## 📦 Escenas 3D

Las escenas complejas están en `lib/scenes/`:

- `EarthScene.svelte`: Wrapper principal
- `EarthSceneCSS.svelte`: Implementación CSS 3D

## 🚀 Mejores Prácticas Aplicadas

### Código

- ✅ TypeScript para type safety
- ✅ Componentes modulares
- ✅ Separación de concerns
- ✅ Código semántico
- ✅ Comentarios cuando sea necesario

### Estilos

- ✅ Variables CSS centralizadas
- ✅ Sistema de diseño consistente
- ✅ Responsive design
- ✅ Accesibilidad (A11y)

### Organización

- ✅ Estructura clara y escalable
- ✅ Nombres descriptivos
- ✅ Agrupación lógica
- ✅ Documentación

## 🔄 Flujo de Trabajo

1. **Nuevo Componente**: Crear en `lib/components/`
2. **Estilos**: Usar variables CSS, agregar estilos scoped si es necesario
3. **Reutilización**: Extraer a `components.css` si se usa en múltiples lugares
4. **Utilidades**: Agregar a `lib/utils/` si es lógica reutilizable

## 📚 Recursos

- [Svelte Documentation](https://svelte.dev/docs)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

