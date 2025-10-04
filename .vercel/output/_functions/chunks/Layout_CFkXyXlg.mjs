import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, h as addAttribute, n as renderHead, k as renderComponent, l as renderSlot } from './astro/server_CfMD-JW6.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                          */
import { jsx } from 'react/jsx-runtime';
import 'react';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> <nav class="container" data-astro-cid-3ef6ksr2> <a href="/" class="logo" data-astro-cid-3ef6ksr2> <img src="/images/logo.svg" alt="Logo de Young Warriors Club" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2>Young Warriors</span> </a> <ul data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2><a href="/" data-astro-cid-3ef6ksr2>Inicio</a></li> <li data-astro-cid-3ef6ksr2><a href="/nosotros" data-astro-cid-3ef6ksr2>Nosotros</a></li> <li data-astro-cid-3ef6ksr2><a href="/entrenadores" data-astro-cid-3ef6ksr2>Entrenadores</a></li> <li data-astro-cid-3ef6ksr2><a href="/jugadores" data-astro-cid-3ef6ksr2>Jugadores</a></li> <li data-astro-cid-3ef6ksr2><a href="/comunidad" data-astro-cid-3ef6ksr2>Comunidad</a></li> <li data-astro-cid-3ef6ksr2><a href="/padres" data-astro-cid-3ef6ksr2>Padres</a></li> </ul> </nav> </header> `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> <div class="footer-content container" data-astro-cid-sz7xmlte> <div class="brand-info" data-astro-cid-sz7xmlte> <a href="/" class="logo" data-astro-cid-sz7xmlte> <img src="/images/logo.svg" alt="Logo de Young Warriors Club" data-astro-cid-sz7xmlte> <span data-astro-cid-sz7xmlte>Young Warriors</span> </a> <p data-astro-cid-sz7xmlte>Formando a los campeones del futuro con disciplina, pasión y trabajo en equipo.</p> </div> <div class="links" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Navegación</h4> <ul data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/nosotros" data-astro-cid-sz7xmlte>Nosotros</a></li> <li data-astro-cid-sz7xmlte><a href="/entrenadores" data-astro-cid-sz7xmlte>Entrenadores</a></li> <li data-astro-cid-sz7xmlte><a href="/blog" data-astro-cid-sz7xmlte>Blog</a></li> </ul> </div> <div class="contact" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Contacto</h4> <p data-astro-cid-sz7xmlte>📍 Av. Ejemplo 123, Trujillo, Perú</p> <p data-astro-cid-sz7xmlte>📞 +51 987 654 321</p> <p data-astro-cid-sz7xmlte>✉️ info@youngwarriors.com</p> </div> </div> <div class="copyright container" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>© ${currentYear} Young Warriors Club. Todos los derechos reservados. |
<a href="http://localhost:8080/young-warriors-web/admin/" target="_blank" data-astro-cid-sz7xmlte>Admin</a> </p> </div> </footer> `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/components/Footer.astro", void 0);

function WhatsAppButton() {
  const clubPhoneNumber = "51987654321";
  const defaultMessage = "Hola, quisiera más información sobre las inscripciones en Young Warriors Club.";
  const whatsappUrl = `https://wa.me/${clubPhoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: whatsappUrl,
      className: "whatsapp-float",
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Contactar por WhatsApp",
      children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" }) })
    }
  );
}

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | Young Warriors Club</title><meta name="description"${addAttribute(description, "content")}><meta property="og:title"${addAttribute(`${title} | Young Warriors Club`, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:url"${addAttribute(Astro2.url.href, "content")}><meta property="og:image"${addAttribute(new URL("/images/social-preview.jpg", Astro2.url), "content")}><meta property="og:locale" content="es_PE"><meta property="og:site_name" content="Young Warriors Club"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(`${title} | Young Warriors Club`, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(new URL("/images/social-preview.jpg", Astro2.url), "content")}><link rel="canonical"${addAttribute(Astro2.url.href, "href")}>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} ${renderComponent($$result, "WhatsAppButton", WhatsAppButton, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/components/features/WhatsAppButton.jsx", "client:component-export": "default" })} </body></html>`;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
