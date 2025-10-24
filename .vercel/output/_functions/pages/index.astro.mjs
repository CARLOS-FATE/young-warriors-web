import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_CfMD-JW6.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BnHIKau0.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$Card } from '../chunks/Card_DiZGb23t.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const { href, text, class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(["button", className], "class:list")} data-astro-cid-6ygtcg62> ${text} </a> `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/components/ui/Button.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const featuredCoaches = [
    { name: "Juan P\xE9rez", role: "Entrenador Principal", img: "/images/coach1.jpg" },
    { name: "Maria Garc\xEDa", role: "Asistente T\xE9cnico", img: "/images/coach2.jpg" },
    { name: "Carlos Mendoza", role: "Preparador F\xEDsico", img: "/images/coach3.jpg" }
  ];
  const WHATSAPP_NUMBER = "51987654321";
  const WHATSAPP_MESSAGE = "Hola, quisiera m\xE1s informaci\xF3n sobre las inscripciones en Young Warriors Club.";
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Formando Campeones de Baloncesto en Trujillo", "description": "Young Warriors Club, la mejor academia de baloncesto para ni\xF1os y j\xF3venes en Trujillo. Fomentamos el talento, la disciplina y el trabajo en equipo.", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="hero" data-astro-cid-j7pv25f6> <div class="hero-content" data-astro-cid-j7pv25f6> <h1 class="tagline" data-astro-cid-j7pv25f6>Donde nacen las leyendas del mañana.</h1> <p class="subtitle" data-astro-cid-j7pv25f6>Transforma el potencial en excelencia. Únete a la familia de Young Warriors y lleva tu juego al siguiente nivel.</p> ${renderComponent($$result2, "Button", $$Button, { "href": WHATSAPP_URL, "text": "Inscr\xEDbete por WhatsApp", "data-astro-cid-j7pv25f6": true })} </div> </section> <section class="features container" data-astro-cid-j7pv25f6> <div class="feature-card" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Card", $$Card, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate` <h3 data-astro-cid-j7pv25f6>Entrenamiento Profesional</h3> <p data-astro-cid-j7pv25f6>Metodologías modernas y entrenadores certificados para un desarrollo técnico de élite.</p> ` })} </div> <div class="feature-card" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Card", $$Card, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate` <h3 data-astro-cid-j7pv25f6>Desarrollo Integral</h3> <p data-astro-cid-j7pv25f6>Fomentamos valores como la disciplina, el respeto y la perseverancia dentro y fuera de la cancha.</p> ` })} </div> <div class="feature-card" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Card", $$Card, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate` <h3 data-astro-cid-j7pv25f6>Comunidad Fuerte</h3> <p data-astro-cid-j7pv25f6>Un ambiente de apoyo donde los jugadores crean lazos de amistad para toda la vida.</p> ` })} </div> </section> <section class="coaches container" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Conoce a nuestro Staff</h2> <p data-astro-cid-j7pv25f6>Profesionales apasionados y dedicados al crecimiento de cada jugador.</p> <div class="coaches-grid" data-astro-cid-j7pv25f6> ${featuredCoaches.map((coach) => renderTemplate`<div class="coach-card" data-astro-cid-j7pv25f6> <img${addAttribute(coach.img, "src")}${addAttribute(`Foto de ${coach.name}`, "alt")} loading="lazy" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>${coach.name}</h3> <span data-astro-cid-j7pv25f6>${coach.role}</span> </div>`)} </div> <div class="more-link" data-astro-cid-j7pv25f6> <a href="/entrenadores" data-astro-cid-j7pv25f6>Ver todo el staff →</a> </div> </section> ` })} `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/index.astro", void 0);

const $$file = "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
   __proto__: null,
   default: $$Index,
   file: $$file,
   url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
