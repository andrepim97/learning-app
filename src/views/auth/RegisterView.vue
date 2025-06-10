<!-- src/views/auth/RegisterView.vue -->
<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthButton from '@/components/auth/AuthButton.vue'
import { ref, inject } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const showSnackbar = inject('showSnackbar')

const register = async () => {
    isLoading.value = true
    try {
        // --- SIMULAÇÃO DA API: Inicio ---
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simula atraso de rede

        if (email.value.includes('@success.com')) { // Use um email específico para sucesso
            console.log('Registo simulado bem-sucedido.')
            showSnackbar('Registo efetuado com sucesso! Pode agora iniciar sessão.', 'success')
            router.push({ name: 'login' })
        } else if (email.value.includes('@error.com')) { // Use um email específico para erro
            throw {
                response: {
                    status: 422,
                    data: {
                        errors: {
                            email: ['Este email já está registado.'],
                            password: ['A palavra-passe é demasiado fraca.']
                        }
                    }
                }
            }
        } else {
            throw {
                response: {
                    status: 500,
                    data: { message: 'Erro desconhecido durante o registo simulado.' }
                }
            }
        }
        // --- SIMULAÇÃO DA API: Fim ---

    } catch (error) {
        console.error('Erro no registo (simulado):', error)
        let errorMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente.'

        if (error.response) {
            if (error.response.status === 422 && error.response.data.errors) {
                const validationErrors = Object.values(error.response.data.errors).flat()
                errorMessage = validationErrors.join(', ')
            } else if (error.response.data.message) {
                errorMessage = error.response.data.message
            } else {
                errorMessage = `Erro: ${error.response.status} - ${error.response.statusText}`;
            }
        } else if (error.request) {
            errorMessage = 'Sem resposta do servidor (simulado). Verifique a sua conexão à internet.'
        }
        showSnackbar(errorMessage, 'error')
    } finally {
        isLoading.value = false
    }
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