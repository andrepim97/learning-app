import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { requiresAuth: false } // Não requer autenticação
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPasswordView.vue'),
    meta: { requiresAuth: false }
  },
  // {
  //   path: '/dashboard', 
  //   name: 'dashboard',
  //   component: () => import('@/views/DashboardView.vue'),
  //   meta: { requiresAuth: true } // Esta vista requer que o utilizador esteja autenticado
  // },
  // Rota wildcard para lidar com caminhos não encontrados (404)
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFoundView.vue') // Certifique-se de criar este componente
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// --- Lógica para garantir que o Firebase Auth está inicializado ---
// Usaremos uma Promise para esperar que o Firebase determine o estado inicial de autenticação.
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener(); // Remove o listener depois da primeira chamada
                resolve(user); // Resolve com o utilizador (ou null se não estiver logado)
            },
            reject
        );
    });
};

// --- Global Navigation Guard ---
router.beforeEach(async (to, from, next) => {
  // Rotas que não requerem autenticação (páginas públicas)
  if (!to.meta.requiresAuth) {
    next(); // Permite o acesso
    return; // Sai da função
  }

  // Se a rota requer autenticação, verifica o estado do utilizador
  try {
    const user = await getCurrentUser(); // Espera que o Firebase determine o utilizador

    if (user) {
      // Utilizador está autenticado
      next(); // Permite o acesso
    } else {
      // Utilizador NÃO está autenticado e a rota requer autenticação
      console.log('Utilizador não autenticado. Redirecionando para login.');
      next({ name: 'login' }); // Redireciona para a página de login
    }
  } catch (error) {
    console.error('Erro na verificação de autenticação:', error);
    showSnackbar('Erro na autenticação. Por favor, tente novamente.', 'error'); // Se tiver snackbar global
    next({ name: 'login' }); // Em caso de erro, redireciona para login
  }
});

export default router;