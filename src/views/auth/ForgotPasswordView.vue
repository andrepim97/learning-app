<!-- src/views/auth/ForgotPasswordView.vue -->
<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthButton from '@/components/auth/AuthButton.vue'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const loading = ref(false)
const router = useRouter()

const emailRules = [
    v => !!v || 'Email é obrigatório',
    v => /.+@.+\..+/.test(v) || 'Email inválido'
]

const showSnackbar = inject('showSnackbar')

const requestReset = async () => {
    loading.value = true
    try {
        // --- SIMULAÇÃO DA API: Inicio ---
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simula atraso de rede

        if (email.value.includes('@found.com')) { // Email que "existe"
            console.log('Pedido de redefinição simulado bem-sucedido.')
            showSnackbar('Se o email estiver registado, receberá instruções para redefinir a sua palavra-passe.', 'success')
            router.push({ name: 'login' })
        } else if (email.value.includes('@notfound.com')) { // Email que "não existe"
            throw {
                response: {
                    status: 404, // Ou 422, dependendo de como a API real responderá
                    data: { message: 'Não encontramos um utilizador com esse email.' }
                }
            }
        } else {
            throw {
                response: {
                    status: 500,
                    data: { message: 'Erro interno simulado ao tentar redefinir palavra-passe.' }
                }
            }
        }
        // --- SIMULAÇÃO DA API: Fim ---

    } catch (error) {
        console.error('Erro ao pedir redefinição (simulado):', error)
        let errorMessage = 'Ocorreu um erro inesperado ao enviar o email.'

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
        loading.value = false
    }
}
</script>

<template>
    <AuthLayout title="Redefinir Palavra-passe">
        <v-form @submit.prevent="requestReset" class="d-flex flex-column gap-4">
            <v-card-text class="text-center text-medium-emphasis">
                Introduza o seu endereço de email e enviaremos um link para redefinir a sua palavra-passe.
            </v-card-text>

            <v-text-field v-model="email" label="Email" type="email" required prepend-inner-icon="mdi-email"
                variant="outlined" :rules="emailRules" />

            <AuthButton :loading="loading" text="Enviar Link de Redefinição" />

            <div class="text-center mt-4 text-caption">
                Lembra-se da sua palavra-passe?
                <v-btn variant="plain" color="blue" size="small" class="text-capitalize" to="/login">
                    Iniciar sessão
                </v-btn>
            </div>
        </v-form>
    </AuthLayout>
</template>

<style scoped>
/* Adicione estilos específicos para esta vista, se necessário */
</style>
