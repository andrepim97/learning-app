<!-- src/views/auth/LoginView.vue -->
<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)

const login = () => {
    console.log({ email: email.value, password: password.value, remember: remember.value })
    // Aqui futuramente será feita a chamada à API
}

const emailRules = [
    v => !!v || 'Email é obrigatório',
    v => /.+@.+\..+/.test(v) || 'Email inválido',
]

const passwordRules = [
    v => !!v || 'Palavra-passe é obrigatória',
    v => v.length >= 6 || 'Mínimo de 6 caracteres',
]
</script>

<template>
    <AuthLayout title="Iniciar Sessão">
        <v-form @submit.prevent="login" class="d-flex flex-column gap-4">
            <v-text-field class="mb-4" v-model="email" label="Email" type="email" required
                prepend-inner-icon="mdi-email" variant="outlined" :rules="emailRules" />

            <v-text-field class="mb-4" v-model="password" :type="showPassword ? 'text' : 'password'"
                label="Palavra-passe" required prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" variant="outlined" :rules="passwordRules" />

            <v-row align="center" class="my-2">
                <v-col cols="auto">
                    <v-checkbox v-model="remember" label="Lembrar-me" hide-details density="compact" />
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn variant="text" color="primary" size="small" class="text-capitalize" to="/forgot-password">
                        Esqueceu-se da palavra-passe?
                    </v-btn>
                </v-col>
            </v-row>

            <v-btn type="submit" color="primary" block size="large" class="mt-2">
                Entrar
            </v-btn>

            <div class="text-center mt-4 text-caption">
                Ainda não tem conta?
                <v-btn variant="plain" color="blue" size="small" class="text-capitalize" to="/register">
                    Criar conta
                </v-btn>
            </div>
        </v-form>
    </AuthLayout>
</template>
