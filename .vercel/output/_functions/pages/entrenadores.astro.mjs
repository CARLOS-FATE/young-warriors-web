import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_CfMD-JW6.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BnHIKau0.mjs';
import 'clsx';
/* empty css                                        */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$CoachCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CoachCard;
  const { coach } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="card" data-astro-cid-g3wyxryd> <img${addAttribute(coach.img, "src")}${addAttribute(`Foto de ${coach.name}`, "alt")} loading="lazy" data-astro-cid-g3wyxryd> <div class="card-content" data-astro-cid-g3wyxryd> <h3 data-astro-cid-g3wyxryd>${coach.name}</h3> <span class="role" data-astro-cid-g3wyxryd>${coach.role}</span> <p class="bio" data-astro-cid-g3wyxryd>${coach.bio}</p> <p class="quote" data-astro-cid-g3wyxryd>"${coach.quote}"</p> </div> </div> `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/components/features/CoachCard.astro", void 0);

const $$Entrenadores = createComponent(async ($$result, $$props, $$slots) => {
  const response = await fetch("/api/coaches.php");
  const coachesData = await response.json();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nuestro Staff de Entrenadores | Young Warriors Club", "description": "Conoce al equipo de entrenadores profesionales y apasionados de Young Warriors Club, dedicados a llevar a cada jugador a su m\xE1ximo potencial.", "data-astro-cid-ulxycf36": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-header" data-astro-cid-ulxycf36> <div class="container-narrow" data-astro-cid-ulxycf36> <span data-astro-cid-ulxycf36>Nuestro Equipo</span> <h1 data-astro-cid-ulxycf36>Los Arquitectos de la Victoria</h1> <p data-astro-cid-ulxycf36>Un equipo de profesionales dedicados a inspirar, enseñar y guiar a la próxima generación de campeones.</p> </div> </section> <section class="coaches-gallery container" data-astro-cid-ulxycf36> <div class="grid" data-astro-cid-ulxycf36> ${coachesData.map((coach) => renderTemplate`${renderComponent($$result2, "CoachCard", $$CoachCard, { "coach": coach, "data-astro-cid-ulxycf36": true })}`)} </div> </section> ` })} `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/entrenadores.astro", void 0);

const $$file = "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/entrenadores.astro";
const $$url = "/entrenadores";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Entrenadores,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
