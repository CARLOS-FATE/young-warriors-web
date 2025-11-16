import { defineConfig } from 'astro/config';
import react from "@astrojs/react";


export default defineConfig({
  site: 'https://young-warriors-web.vercel.app', 
  integrations: [
    react()
  ],
  output: "server" 
  
});