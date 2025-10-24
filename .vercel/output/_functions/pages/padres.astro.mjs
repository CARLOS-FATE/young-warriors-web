import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CfMD-JW6.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BnHIKau0.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Padres = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Padres;
  const error = Astro2.url.searchParams.get("error");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Portal para Padres | Young Warriors Club", "description": "Acceso exclusivo para padres y apoderados. Consulta el progreso, calendarios y comunicados importantes.", "data-astro-cid-xcqauq4w": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-header" data-astro-cid-xcqauq4w> <div class="container-narrow" data-astro-cid-xcqauq4w> <span data-astro-cid-xcqauq4w>Portal Exclusivo</span> <h1 data-astro-cid-xcqauq4w>Bienvenido, Padre de Familia</h1> <p data-astro-cid-xcqauq4w>Este es tu espacio privado para seguir de cerca el desarrollo de tu campeón, acceder a comunicados y más.</p> </div> </section> <section class="login-section container" data-astro-cid-xcqauq4w> <div class="login-form-container" data-astro-cid-xcqauq4w> <h2 data-astro-cid-xcqauq4w>Iniciar Sesión</h2> ${error && renderTemplate`<p class="error-message" data-astro-cid-xcqauq4w>Usuario o contraseña incorrectos. Por favor, intenta de nuevo.</p>`} <form action="/api/login_process.php" method="post" data-astro-cid-xcqauq4w> <div class="form-group" data-astro-cid-xcqauq4w> <label for="username" data-astro-cid-xcqauq4w>Nombre de Usuario</label> <input type="text" id="username" name="username" placeholder="usuario.de.prueba" required data-astro-cid-xcqauq4w> </div> <div class="form-group" data-astro-cid-xcqauq4w> <label for="password" data-astro-cid-xcqauq4w>Contraseña</label> <input type="password" id="password" name="password" required data-astro-cid-xcqauq4w> </div> <div class="button-wrapper" data-astro-cid-xcqauq4w> <button type="submit" class="submit-button" data-astro-cid-xcqauq4w>Ingresar al Portal</button> </div> <p class="form-footer" data-astro-cid-xcqauq4w>¿Problemas para ingresar? <a href="#" data-astro-cid-xcqauq4w>Contacta a soporte</a>.</p> </form> </div> </section> ` })} `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/padres.astro", void 0);

const $$file = "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/padres.astro";
const $$url = "/padres";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Padres,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
