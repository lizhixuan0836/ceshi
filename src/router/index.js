import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminHome from '@/views/Admin/Index';
import Client from '@/views/Client/Index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Client',
    component: Client,
  },
  {
    path: '/admin',
    component: AdminHome,
    redirect: '/admin/node',
    children: [
      {
        path: 'node',
        name: 'NodeManager',
        component: () => import(/* webpackChunkName: "Node" */ '@/views/Admin/Node/Index.vue'),
      },
      {
        path: 'param',
        name: 'ParamManager',
        component: () => import(/* webpackChunkName: "Param" */ '@/views/Admin/Param/Index.vue'),
      },
      {
        path: 'fun',
        name: 'FunManager',
        component: () => import(/* webpackChunkName: "Fun" */ '@/views/Admin/Fun/Index.vue'),
      },
      {
        path: 'keyword',
        name: 'KeywordManager',
        component: () => import(/* webpackChunkName: "Keyword" */ '@/views/Admin/Keyword/Index.vue'),
      },
      {
        path: 'editor',
        name: 'EditorManager',
        component: () => import(/* webpackChunkName: "Editor" */ '@/views/Admin/Editor/Index.vue'),
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
