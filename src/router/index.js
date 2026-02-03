import { createRouter, createWebHashHistory } from 'vue-router';
import DemoReel from '../views/DemoReel.vue';

const routes = [
  { path: '/', name: 'DemoReel', component: DemoReel },
  { path: '/animation', component: () => import('../views/AnimationProjects.vue') },
  { path: '/storyboard', component: () => import('../views/Storyboard.vue') },
  { path: '/concept-art', component: () => import('../views/ConceptArt.vue') },
  { path: '/sequential', component: () => import('../views/Sequential.vue') },
  { path: '/resume', component: () => import('../views/Resume.vue') },
  { path: '/more', component: () => import('../views/More.vue') },
  // More 的子页面
  { path: '/illustration', component: () => import('../views/Illustration.vue') },
  { path: '/3d', component: () => import('../views/ThreeD.vue') },
];

const router = createRouter({
  // 使用 hash 路由即可，不再依赖 process.env.BASE_URL（那是 Vue CLI 的写法）
  history: createWebHashHistory(),
  routes,
});

export default router;