import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_CfMD-JW6.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_BnHIKau0.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
function getStaticPaths() {
  return allPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const response = await fetch("/api/posts.php");
  await response.json();
  const { post } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": post.title, "description": post.description, "data-astro-cid-4sn4zg3r": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="container-narrow" data-astro-cid-4sn4zg3r> <img${addAttribute(post.image, "src")}${addAttribute(post.title, "alt")} class="hero-image" data-astro-cid-4sn4zg3r> <span class="category" data-astro-cid-4sn4zg3r>${post.category}</span> <h1 data-astro-cid-4sn4zg3r>${post.title}</h1> <div class="post-content" data-astro-cid-4sn4zg3r>${unescapeHTML(post.content)}</div> </article> ` })} `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/blog/[slug].astro", void 0);

const $$file = "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
