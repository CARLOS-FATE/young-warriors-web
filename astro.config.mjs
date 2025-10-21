import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
// 👇 CORREGIDO: Esta es la nueva importación
import vercel from "@astrojs/vercel"; 

// https://astro.build/config
export default defineConfig({
  site: 'https://young-warriors.vercel.app',

  integrations: [react()],
  output: "server",
  adapter: vercel()
});