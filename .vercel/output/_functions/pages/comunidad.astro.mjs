import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CfMD-JW6.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CFkXyXlg.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Comunidad = createComponent(($$result, $$props, $$slots) => {
  const galleryEvents = [
    {
      name: "Torneo de Verano 2025",
      photos: [
        { src: "/images/gallery/summer-1.jpg", alt: "Jugador lanzando un tiro libre" },
        { src: "/images/gallery/summer-2.jpg", alt: "Equipo celebrando una victoria" },
        { src: "/images/gallery/summer-3.jpg", alt: "Entrenador dando instrucciones" },
        { src: "/images/gallery/summer-4.jpg", alt: "Padres animando desde las gradas" }
      ]
    },
    {
      name: "D\xEDa de Entrenamiento",
      photos: [
        { src: "/images/gallery/training-1.jpg", alt: "Jugadores haciendo ejercicios de dribbling" },
        { src: "/images/gallery/training-2.jpg", alt: "Jugadora practicando un crossover" },
        { src: "/images/gallery/training-3.jpg", alt: "Estiramientos en equipo antes de empezar" }
      ]
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nuestra Comunidad | Galer\xEDa de Momentos Young Warriors", "description": "Explora los mejores momentos de Young Warriors Club. Mira las fotos de nuestros torneos, entrenamientos y eventos comunitarios en Trujillo.", "data-astro-cid-odsppser": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-header" data-astro-cid-odsppser> <div class="container-narrow" data-astro-cid-odsppser> <span data-astro-cid-odsppser>Nuestra Familia</span> <h1 data-astro-cid-odsppser>El Corazón del Club: Nuestra Gente</h1> <p data-astro-cid-odsppser>Revive los momentos que nos definen. Cada foto cuenta una historia de esfuerzo, compañerismo y pasión por el baloncesto.</p> </div> </section> <section class="gallery-section container" data-astro-cid-odsppser> ${galleryEvents.map((event) => renderTemplate`<div class="event-album" data-astro-cid-odsppser> <h2 data-astro-cid-odsppser>${event.name}</h2> <div class="photo-grid" data-astro-cid-odsppser> ${event.photos.map((photo) => renderTemplate`<div class="photo-card" data-astro-cid-odsppser> <img${addAttribute(photo.src, "src")}${addAttribute(photo.alt, "alt")} loading="lazy" data-astro-cid-odsppser> </div>`)} </div> </div>`)} </section> <section class="coming-soon container" data-astro-cid-odsppser> <h2 data-astro-cid-odsppser>Más Historias por Contar</h2> <p data-astro-cid-odsppser>Próximamente aquí encontrarás testimonios de nuestros padres y jugadores, además de historias de éxito de nuestros ex-alumnos que hoy triunfan dentro y fuera de la cancha.</p> </section> ` })} `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/comunidad.astro", void 0);

const $$file = "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/comunidad.astro";
const $$url = "/comunidad";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Comunidad,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
