import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  site: 'https://young-warriors-web.vercel.app', 
  integrations: [
    react()
  ],
  output: "server" ,
  adapter: node({  // <-- 2. Usar el adaptador de Node.js
    mode: "standalone" // Esto es clave para Vercel
  })
});