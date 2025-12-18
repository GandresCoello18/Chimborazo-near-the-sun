# Chimborazo: Closest Point to the Sun

An interactive 3D educational SPA explaining why Chimborazo (Ecuador) is the point on Earth closest to the Sun, even though Mount Everest is taller.

## Tech Stack

- **Svelte** + **Vite** - Framework and build tool
- **Three.js** via **Threlte** - 3D rendering
- **@threlte/extras** - OrbitControls and helpers

## Development

```bash
npm install
npm run dev
```

## Project Structure

```
/src
  /lib
    /components      # Reusable 3D components
    /scenes          # Main scene components
    /utils           # Utilities (geo conversion, constants)
  App.svelte
  main.ts
```

