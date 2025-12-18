import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 5173,
    open: true,
    host: true, // Permite acceso desde cualquier host
    allowedHosts: [
      'localhost',
      '.loca.lt', // Permite cualquier subdominio de loca.lt
      '.local' // Permite hosts locales
    ]
  }
});

