<!-- src/views/auth/ForgotPasswordView.vue -->
<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthButton from '@/components/auth/AuthButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const loading = ref(false)
const router = useRouter()

const emailRules = [
    v => !!v || 'Email é obrigatório',
    v => /.+@.+\..+/.test(v) || 'Email inválido'
]

const requestReset = async () => {
    loading.value = true
    console.log('Pedido de redefinição de palavra-passe para:', email.value)

    try {
        await new Promise(resolve => setTimeout(resolve, 2000)) // simulação
        alert('Se o email estiver registado, receberá instruções para redefinir a sua palavra-passe.')
        router.push({ name: 'login' })
    } catch (error) {
        console.error('Erro ao pedir redefinição:', error)
        alert('Ocorreu um erro ao processar o seu pedido. Por favor, tente novamente.')
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
