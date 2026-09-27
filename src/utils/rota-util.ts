import type { RouteLocationNormalizedLoaded, RouteLocationRaw } from 'vue-router';

/** Volta para a página que pediu login (query "redirect") ou para a lista de senadores. */
const destinoAposLogin = (rota: RouteLocationNormalizedLoaded): RouteLocationRaw => {
  const redirect = rota.query.redirect;
  return typeof redirect === 'string' && redirect.startsWith('/')
    ? redirect
    : { name: 'senadores' };
};

export { destinoAposLogin };
