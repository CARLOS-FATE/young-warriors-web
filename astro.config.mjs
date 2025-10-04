import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  // 👇 AÑADE ESTA LÍNEA AQUÍ
  site: 'https://young-warriors.vercel.app', 

  integrations: [react()],
  output: "server",
  adapter: vercel()
});