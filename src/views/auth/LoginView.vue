<!-- views/auth/LoginView.view -->
<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const remember = ref(false)

const login = () => {
  console.log({ email: email.value, password: password.value, remember: remember.value })
  // Aqui futuramente será feita a chamada à API
}
</script>

<template>
  <AuthLayout>
    <h2 class="text-2xl font-bold mb-6 text-center">Iniciar Sessão</h2>

    <form @submit.prevent="login" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium">Palavra-passe</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="flex items-center justify-between">
        <label class="flex items-center text-sm">
          <input type="checkbox" v-model="remember" class="mr-2" />
          Lembrar-me
        </label>
        <a href="#" class="text-sm text-blue-600 hover:underline">Esqueceu-se da palavra-passe?</a>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Entrar
      </button>
    </form>

    <p class="mt-6 text-sm text-center">
      Ainda não tem conta?
      <a href="#" class="text-blue-600 hover:underline">Criar conta</a>
    </p>
  </AuthLayout>
</template>
