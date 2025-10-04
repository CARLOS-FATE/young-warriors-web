import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CfMD-JW6.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CFkXyXlg.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

function PlayerCard({ player }) {
  const [showAchievements, setShowAchievements] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "player-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "player-photo", children: [
      /* @__PURE__ */ jsx("img", { src: player.img, alt: `Foto de ${player.name}`, loading: "lazy" }),
      /* @__PURE__ */ jsx("span", { className: "player-position", children: player.position })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "player-info", children: [
      /* @__PURE__ */ jsx("h3", { children: player.name }),
      /* @__PURE__ */ jsxs("div", { className: "skills-map", children: [
        /* @__PURE__ */ jsx("h4", { children: "Mapa de Evolución" }),
        Object.entries(player.skills).map(([skillName, value]) => /* @__PURE__ */ jsxs("div", { className: "skill", children: [
          /* @__PURE__ */ jsx("span", { className: "skill-name", children: skillName }),
          /* @__PURE__ */ jsx("div", { className: "skill-bar-container", children: /* @__PURE__ */ jsx("div", { className: "skill-bar", style: { width: `${value}%` } }) })
        ] }, skillName))
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "toggle-button",
          onClick: () => setShowAchievements(!showAchievements),
          children: showAchievements ? "Ocultar Logros" : "Ver Logros Colectivos"
        }
      ),
      showAchievements && /* @__PURE__ */ jsx("div", { className: "achievements", children: /* @__PURE__ */ jsx("ul", { children: player.teamAchievements.map((achievement, index) => /* @__PURE__ */ jsx("li", { children: achievement }, index)) }) })
    ] })
  ] });
}

const $$Jugadores = createComponent(async ($$result, $$props, $$slots) => {
  const response = await fetch("http://localhost:8080/young-warriors-web/api/players.php");
  const playersData = await response.json();
  const mvp = playersData.find((player) => player.isMVP);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Nuestros Jugadores | Plantilla de Young Warriors", "description": "Conoce a los talentosos jugadores de Young Warriors Club. Revisa sus perfiles, habilidades y logros.", "data-astro-cid-pyybvbts": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-header" data-astro-cid-pyybvbts> <div class="container-narrow" data-astro-cid-pyybvbts> <span data-astro-cid-pyybvbts>Nuestros Guerreros</span> <h1 data-astro-cid-pyybvbts>La Plantilla de Young Warriors</h1> <p data-astro-cid-pyybvbts>El talento, la dedicación y el corazón que definen a nuestro club en la cancha.</p> </div> </section> ${mvp && renderTemplate`<section class="mvp-section container" data-astro-cid-pyybvbts> <h2 data-astro-cid-pyybvbts>🏆 Jugador del Mes</h2> <div class="mvp-card-wrapper" data-astro-cid-pyybvbts> ${renderComponent($$result2, "PlayerCard", PlayerCard, { "client:visible": true, "player": mvp, "client:component-hydration": "visible", "client:component-path": "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/components/features/PlayerCard.jsx", "client:component-export": "default", "data-astro-cid-pyybvbts": true })} </div> </section>`}<section class="squad-section container" data-astro-cid-pyybvbts> <h2 data-astro-cid-pyybvbts>Conoce a todo el equipo</h2> <div class="player-grid" data-astro-cid-pyybvbts> ${playersData.map((player) => renderTemplate`${renderComponent($$result2, "PlayerCard", PlayerCard, { "client:visible": true, "player": player, "client:component-hydration": "visible", "client:component-path": "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/components/features/PlayerCard.jsx", "client:component-export": "default", "data-astro-cid-pyybvbts": true })}`)} </div> </section> ` })} `;
}, "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/jugadores.astro", void 0);

const $$file = "D:/XAMPP/Nueva carpeta/htdocs/young-warriors-web/src/pages/jugadores.astro";
const $$url = "/jugadores";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Jugadores,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
