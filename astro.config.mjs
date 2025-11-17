import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel"; 

export default defineConfig({
  
  site: 'https://young-warriors-web-ny9b.vercel.app', 
  
  integrations: [
    react()
  ],
  output: "server",
  adapter: vercel() 
});