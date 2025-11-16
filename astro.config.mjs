import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  site: 'https://young-warriors-web.vercel.app', 
  integrations: [
    react()
  ],
  output: "server" ,
  adapter: node({  
    mode: "middleware" 
  })
});