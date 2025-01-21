import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/view-survey',
      name: 'view-survey',
      component: () => import('../views/ViewSurveyView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/create-survey',
      name: 'create-survey',
      component: () => import('../views/CreateSurveyView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/answer-survey',
      name: 'create-survey',
      component: () => import('../views/AnswerSurveyView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../app/Login.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../app/Register.vue'),
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    if (to.path !== '/register') {
      return next({ path: '/login' });
    }
  }
  next();
});

export default router;
