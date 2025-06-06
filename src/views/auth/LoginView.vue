<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthButton from '@/components/auth/AuthButton.vue'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router' // Importa useRouter para navegação

const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)

const router = useRouter() // Inicializa o router

const showSnackbar = inject('showSnackbar')

const login = async () => {
    isLoading.value = true
    try {
        // --- SIMULAÇÃO DA API: Inicio ---
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simula atraso de rede

        if (email.value === 'test@example.com' && password.value === 'password') {
            // SIMULAÇÃO DE SUCESSO
            console.log('Login simulado bem-sucedido.')
            showSnackbar('Login efetuado com sucesso!', 'success')
            router.push({ name: 'dashboard' }) // Redireciona para a dashboard
        } else if (email.value === 'validation@error.com') {
            // SIMULAÇÃO DE ERRO DE VALIDAÇÃO (Ex: email inválido format)
            throw {
                response: {
                    status: 422,
                    data: {
                        errors: {
                            email: ['O formato do email é inválido.'],
                            password: ['A palavra-passe deve ter pelo menos 6 caracteres.']
                        }
                    }
                }
            }
        } else if (email.value === 'invalid@credentials.com') {
            // SIMULAÇÃO DE CREDENCIAIS INVÁLIDAS
            throw {
                response: {
                    status: 401,
                    data: { message: 'Credenciais inválidas. Verifique o seu email e palavra-passe.' }
                }
            }
        }
        else {
            // SIMULAÇÃO DE ERRO GENÉRICO
            throw {
                response: {
                    status: 500,
                    data: { message: 'Erro interno do servidor simulado.' }
                }
            }
        }
        // --- SIMULAÇÃO DA API: Fim ---

    } catch (error) {
        // Tratamento de Erro (o mesmo da versão com Axios, mas "error" vem da simulação)
        console.error('Erro no login (simulado):', error)
        let errorMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente.'

        if (error.response) {
            if (error.response.status === 422 && error.response.data.errors) {
                const validationErrors = Object.values(error.response.data.errors).flat()
                errorMessage = validationErrors.join(', ')
            } else if (error.response.status === 401) {
                errorMessage = 'Credenciais inválidas. Verifique o seu email e palavra-passe.'
            } else if (error.response.data.message) {
                errorMessage = error.response.data.message
            } else {
                errorMessage = `Erro: ${error.response.status} - ${error.response.statusText}`;
            }
        } else if (error.request) { // Este caso é menos provável com simulação interna, mas mantido
            errorMessage = 'Sem resposta do servidor (simulado). Verifique a sua conexão à internet.'
        }
        showSnackbar(errorMessage, 'error')
    } finally {
        isLoading.value = false
    }
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
            <v-text-field v-model="email" label="Email" type="email" required prepend-inner-icon="mdi-email"
                variant="outlined" :rules="emailRules" />

            <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Palavra-passe" required
                prepend-inner-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" variant="outlined" :rules="passwordRules" />

            <v-row align="center" class="mt-n2 mb-2"> <v-col cols="auto">
                    <v-checkbox v-model="remember" label="Lembrar-me" hide-details density="compact" />
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn variant="text" color="primary" size="small" class="text-capitalize" to="/forgot-password">
                        Esqueceu-se da palavra-passe?
                    </v-btn>
                </v-col>
            </v-row>

            <AuthButton :loading="isLoading" text="Entrar" />

            <div class="text-center mt-4 text-caption">
                Ainda não tem conta?
                <v-btn variant="plain" color="blue" size="small" class="text-capitalize" to="/register">
                    Criar conta
                </v-btn>
            </div>
        </v-form>
    </AuthLayout>
</template>

<style scoped>
/* Se precisar de estilos específicos para a vista de login */
</style>