import type { RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /** Rota exige usuário autenticado. */
    requiresAuth?: boolean;
    /** Rota só faz sentido para visitantes (login e cadastro). */
    apenasVisitante?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'senadores', component: () => import('@/pages/SenadoresPage.vue') },
      {
        path: 'senadores/:codigo(\\d+)',
        name: 'senador',
        component: () => import('@/pages/SenadorPage.vue'),
        props: (rota) => ({ codigo: Number(rota.params.codigo) }),
      },
      {
        path: 'acompanhamentos',
        name: 'acompanhamentos',
        component: () => import('@/pages/AcompanhamentosPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/usuario/LoginPage.vue'),
        meta: { apenasVisitante: true },
      },
      {
        path: 'cadastro',
        name: 'cadastro',
        component: () => import('@/pages/usuario/CadastroPage.vue'),
        meta: { apenasVisitante: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];

export default routes;
