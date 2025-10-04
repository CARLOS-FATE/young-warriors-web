import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_CfMD-JW6.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CFkXyXlg.mjs';
import { $ as $$Card } from '../chunks/Card_D1cG_D7m.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const response = await fetch("http://localhost:8080/young-warriors-web/api/posts.php");
  const postsData = await response.json();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog Educativo | Young Warriors Club", "description": "Art\xEDculos, consejos y noticias de Young Warriors. Aprende sobre t\xE9cnica de baloncesto, formaci\xF3n y nutrici\xF3n.", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-header" data-astro-cid-5tznm7mj> <div class="container-narrow" data-astro-cid-5tznm7mj> <span data-astro-cid-5tznm7mj>Aprendizaje y Formación</span> <h1 data-astro-cid-5tznm7mj>Nuestro Blog Educativo</h1> <p data-astro-cid-5tznm7mj>Un espacio para jugadores, padres y aficionados. Aquí compartimos nuestro conocimiento y pasión por el baloncesto.</p> </div> </section> <section class="posts-list container" data-astro-cid-5tznm7mj> <div class="posts-grid" data-astro-cid-5tznm7mj> ${postsData.map((post) => renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="post-card-link" data-astro-cid-5tznm7mj> ${renderComponent($$result2, "Card", $$Card, { "data-astro-cid-5tznm7mj": true }, { "default": async ($$result3) => renderTemplate` <img${addAttribute(post.image, "src")}${addAttribute(post.title, "alt")} class="post-image" loading="lazy" data-astro-cid-5tznm7mj> <div class="post-content" data-astro-cid-5tznm7mj> <span class="post-category" data-astro-cid-5tznm7mj>${post.category}</span> <h3 class="post-title" data-astro-cid-5tznm7mj>${post.title}</h3> <p class="post-description" data-astro-cid-5tznm7mj>${post.description}</p> <span class="read-more" data-astro-cid-5tznm7mj>Leer más →</span> </div> ` })} </a>`)} </div> </section> ` })} `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/blog/index.astro", void 0);

const $$file = "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
