import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel"; 

export default defineConfig({
  site: 'https://young-warriors-web.vercel.app', 
  integrations: [
    react()
  ],
  output: "server",
  adapter: vercel({
    // ----- ¡LA SINTAXIS CORRECTA! -----
    // Le decimos que copie la CARPETA /api entera
    includeFiles: [ './api' ] 
  }) 
});