
const routes = [
  {
    path: '/',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: 'home', component: () => import('pages/Index.vue') },
      { path: 'finance', component: () => import('pages/Finance.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
