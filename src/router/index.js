import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    // Meta field para controlo de acesso (opcional, mas bom para planeamento)
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'), // Lazy-load
    meta: { requiresAuth: false }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPasswordView.vue'), // Lazy-load
    meta: { requiresAuth: false }
  },
  //   {
  //     path: '/dashboard',
  //     name: 'dashboard',
  //     component: () => import('@/views/DashboardView.vue'),
  //     meta: { requiresAuth: true } // Esta vista requer que o utilizador esteja autenticado
  //   }
]

const router = createRouter({
  history: createWebHistory(), // Usa o modo de histórico para URLs limpas (sem #)
  routes, // As tuas rotas definidas
})

// Exemplo de um Global Navigation Guard (opcional, mas muito útil para autenticação)
// router.beforeEach((to, from, next) => {
//   const loggedIn = true; // Substituir isto pela tua lógica real de autenticação (ex: verificar token)

//   if (to.meta.requiresAuth && !loggedIn) {
//     next({ name: 'login' }); // Redireciona para login se for necessária autenticação e não estiver logado
//   } else {
//     next(); // Continua para a rota
//   }
// });


export default router