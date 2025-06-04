<!-- src/views/auth/LoginView.vue -->
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
        <v-form @submit.prevent="login" class="d-flex flex-column gap-4">
            <v-card-title class="text-h5 text-center">Iniciar Sessão</v-card-title>

            <v-text-field v-model="email" label="Email" type="email" required prepend-inner-icon="mdi-email"
                variant="outlined" />

            <v-text-field v-model="password" label="Palavra-passe" type="password" required
                prepend-inner-icon="mdi-lock" variant="outlined" />

            <v-row align="center" class="my-2">
                <v-col cols="auto"> <v-checkbox v-model="remember" label="Lembrar-me" hide-details density="compact" />
                </v-col>
                <v-col class="d-flex justify-end"> <v-btn variant="text" color="primary" size="small"
                        class="text-capitalize" to="/forgot-password">
                        Esqueceu-se da palavra-passe?
                    </v-btn>
                </v-col>
            </v-row>

            <v-btn type="submit" color="primary" block size="large" class="mt-2">
                Entrar
            </v-btn>

            <div class="text-center mt-4 text-caption">
                Ainda não tem conta?
                <a href="#" class="text-blue text-decoration-underline">Criar conta</a>
            </div>
        </v-form>
    </AuthLayout>
</template>
