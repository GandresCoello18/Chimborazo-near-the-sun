// vite.config.js
import { defineConfig } from "file:///C:/Users/Gandres/Desktop/chimborazo/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///C:/Users/Gandres/Desktop/chimborazo/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
var vite_config_default = defineConfig({
  plugins: [svelte()],
  server: {
    port: 5173,
    open: true,
    host: true,
    // Permite acceso desde cualquier host
    allowedHosts: [
      "localhost",
      ".loca.lt",
      // Permite cualquier subdominio de loca.lt
      ".local"
      // Permite hosts locales
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxHYW5kcmVzXFxcXERlc2t0b3BcXFxcY2hpbWJvcmF6b1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcR2FuZHJlc1xcXFxEZXNrdG9wXFxcXGNoaW1ib3Jhem9cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0dhbmRyZXMvRGVza3RvcC9jaGltYm9yYXpvL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbc3ZlbHRlKCldLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogNTE3MyxcclxuICAgIG9wZW46IHRydWUsXHJcbiAgICBob3N0OiB0cnVlLCAvLyBQZXJtaXRlIGFjY2VzbyBkZXNkZSBjdWFscXVpZXIgaG9zdFxyXG4gICAgYWxsb3dlZEhvc3RzOiBbXHJcbiAgICAgICdsb2NhbGhvc3QnLFxyXG4gICAgICAnLmxvY2EubHQnLCAvLyBQZXJtaXRlIGN1YWxxdWllciBzdWJkb21pbmlvIGRlIGxvY2EubHRcclxuICAgICAgJy5sb2NhbCcgLy8gUGVybWl0ZSBob3N0cyBsb2NhbGVzXHJcbiAgICBdXHJcbiAgfVxyXG59KTtcclxuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVMsU0FBUyxvQkFBb0I7QUFDbFUsU0FBUyxjQUFjO0FBRXZCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFBQSxFQUNsQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLGNBQWM7QUFBQSxNQUNaO0FBQUEsTUFDQTtBQUFBO0FBQUEsTUFDQTtBQUFBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
