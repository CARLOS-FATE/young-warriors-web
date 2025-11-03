import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
// Cambio recomendado: importar 'serverless' directamente
import vercel from "@astrojs/vercel/serverless"; 

// https://astro.build/config
export default defineConfig({
  site: 'https://young-warriors-web.vercel.app', 

  integrations: [
    react()
  ],
  
  output: "server", // ¡Correcto!
  
  adapter: vercel({
    // Puedes dejar esto vacío si no necesitas opciones especiales
  }) // ¡Correcto!
  
});