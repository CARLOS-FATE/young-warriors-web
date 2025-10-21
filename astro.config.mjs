import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel"; 

// https://astro.build/config
export default defineConfig({
  site: 'https://young-warriors.vercel.app',

  integrations: [react()],
  output: "server",
  adapter: vercel()
});