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
    // ----- ¡ESTA ES LA SINTAXIS CORRECTA! -----
    // Le decimos a Vercel que estos archivos son necesarios
    // en el runtime de la función del servidor.
    functionPerRoute: false,
    includeFiles: [
      './api/ca-tidb.crt', // Incluye el certificado
      './api/db_connection.php' // Incluye la conexión
      // Añade aquí CUALQUIER otro archivo que sea "requerido" por tus scripts
    ]
  }) 
});