import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel"; // <-- LÍNEA CORREGIDA

export default defineConfig({
  site: 'https://young-warriors-web.vercel.app', 
  integrations: [
    react()
  ],
  output: "server",
  adapter: vercel() 
});