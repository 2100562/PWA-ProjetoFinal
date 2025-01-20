import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/view-survey',
      name: 'view-survey',
      component: () => import('../views/ViewSurveyView.vue'),
    },
    {
      path: '/create-survey',
      name: 'create-survey',
      component: () => import('../views/CreateSurveyView.vue'),
    },
    {
      path: '/answer-survey',
      name: 'create-survey',
      component: () => import('../views/AnswerSurveyView.vue'),
    },
  ],
});

export default router;
