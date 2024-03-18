export const basicsRoutes = [
  {
    path: '/basics/basic-setup',
    name: 'Basic Setup',
    component: () => import('../../pages/basics/BasicsDemo.vue'),
  },
  {
    path: '/basics/custom-keys',
    name: 'Custom Keys',
    component: () => import('../../pages/basics/CustomKeysDemo.vue'),
  },
  {
    path: '/basics/model-demo',
    name: 'Model Demo',
    component: () => import('../../pages/basics/ModelDemo.vue'),
  },
]
