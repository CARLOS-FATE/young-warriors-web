import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DGJrbToP.mjs';
import { manifest } from './manifest_3-KD89OH.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/blog/_slug_.astro.mjs');
const _page2 = () => import('./pages/blog.astro.mjs');
const _page3 = () => import('./pages/comunidad.astro.mjs');
const _page4 = () => import('./pages/entrenadores.astro.mjs');
const _page5 = () => import('./pages/jugadores.astro.mjs');
const _page6 = () => import('./pages/nosotros.astro.mjs');
const _page7 = () => import('./pages/padres.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/blog/[slug].astro", _page1],
    ["src/pages/blog/index.astro", _page2],
    ["src/pages/comunidad.astro", _page3],
    ["src/pages/entrenadores.astro", _page4],
    ["src/pages/jugadores.astro", _page5],
    ["src/pages/nosotros.astro", _page6],
    ["src/pages/padres.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "e398872b-90ac-4d2b-a207-255195ba580f",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
