import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
// ¡NO HAY ADAPTADOR IMPORTADO!

export default defineConfig({
  site: 'https://young-warriors-web.vercel.app', 
  integrations: [
    react()
  ],
  output: "server" // Mantenemos el modo SSR
  // ¡NO HAY SECCIÓN 'adapter:'!
});