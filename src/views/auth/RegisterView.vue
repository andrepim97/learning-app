<!-- src/views/auth/RegisterView.vue -->
<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthButton from '@/components/auth/AuthButton.vue'
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const register = async () => {
    isLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000)) // simulação
    console.log({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value
    })
    isLoading.value = false
}

const nameRules = [
    v => !!v || 'Nome é obrigatório',
    v => v.length >= 2 || 'Nome demasiado curto'
]

const emailRules = [
    v => !!v || 'Email é obrigatório',
    v => /.+@.+\..+/.test(v) || 'Email inválido'
]

const passwordRules = [
    v => !!v || 'Palavra-passe é obrigatória',
    v => v.length >= 6 || 'Mínimo de 6 caracteres'
]

const passwordConfirmationRules = [
    v => !!v || 'Confirmação obrigatória',
    v => v === password.value || 'As palavras-passe não coincidem'
]
</script>

<template>
    <AuthLayout title="Criar Conta">
        <v-form @submit.prevent="register" class="d-flex flex-column gap-4">
            <v-text-field
                v-model="name"
                label="Nome"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                :rules="nameRules"
                autocomplete="name" />

            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                :rules="emailRules"
                autocomplete="email" />

            <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Palavra-passe"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                :rules="passwordRules"
                :aria-label="showPassword ? 'Esconder palavra-passe' : 'Mostrar palavra-passe'" autocomplete="new-password" />

            <v-text-field
                v-model="passwordConfirmation"
                :type="showPassword ? 'text' : 'password'"
                label="Confirmar palavra-passe"
                prepend-inner-icon="mdi-lock-check"
                variant="outlined"
                :rules="passwordConfirmationRules"
                :aria-label="showPassword ? 'Esconder confirmação de palavra-passe' : 'Mostrar confirmação de palavra-passe'" autocomplete="new-password" />

            <AuthButton :loading="isLoading" text="Registar" />

            <div class="text-center mt-4 text-caption">
                Já tem conta?
                <v-btn
                    variant="plain"
                    color="blue"
                    size="small"
                    class="text-capitalize"
                    to="/login"
                    aria-label="Já tem conta? Clique aqui para iniciar sessão." >
                    Iniciar sessão
                </v-btn>
            </div>
        </v-form>
    </AuthLayout>
</template>