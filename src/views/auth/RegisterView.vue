<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthButton from '@/components/auth/AuthButton.vue'
import { ref, inject } from 'vue' // Certifica-te que 'inject' está aqui
import { useRouter } from 'vue-router'
// Importa as funções de autenticação do Firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/plugins/firebase'; // Importa a instância 'auth'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const router = useRouter()
const showSnackbar = inject('showSnackbar')

const register = async () => {
    isLoading.value = true // Ativa o estado de carregamento do botão
    try {
        // --- 1. Criar o Utilizador com Email e Palavra-passe ---
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // --- 2. Opcional: Adicionar o Nome de Exibição (Display Name) ---
        // O Firebase não guarda o nome do utilizador automaticamente ao criar por email/senha.
        // É uma boa prática adicioná-lo logo após o registo.
        if (user) {
            await updateProfile(user, {
                displayName: name.value
            });
            console.log('Nome do utilizador atualizado:', user.displayName);
        }

        console.log('Registo Firebase bem-sucedido:', user);
        showSnackbar('Conta criada com sucesso! Pode agora iniciar sessão.', 'success');

        router.push({ name: 'login' });

    } catch (error) {
        // --- Tratamento de Erros do Firebase ---
        console.error('Erro no registo Firebase:', error);
        let errorMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente.';

        // O Firebase fornece códigos de erro específicos para o registo
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Este email já está registado. Por favor, use outro ou inicie sessão.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'O formato do email é inválido.';
                break;
            case 'auth/weak-password':
                errorMessage = 'A palavra-passe é demasiado fraca. Mínimo de 6 caracteres.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'O registo por email/palavra-passe não está ativado. Contacte o suporte.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Erro de rede. Verifique a sua conexão à internet.';
                break;
            default:
                errorMessage = 'Erro no registo: ' + error.message;
        }
        showSnackbar(errorMessage, 'error');
    } finally {
        isLoading.value = false; // Desativa o estado de carregamento
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
            <v-text-field v-model="name" label="Nome" prepend-inner-icon="mdi-account" variant="outlined"
                :rules="nameRules" autocomplete="name" />

            <v-text-field v-model="email" label="Email" type="email" prepend-inner-icon="mdi-email" variant="outlined"
                :rules="emailRules" autocomplete="email" />

            <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Palavra-passe"
                prepend-inner-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" variant="outlined" :rules="passwordRules"
                :aria-label="showPassword ? 'Esconder palavra-passe' : 'Mostrar palavra-passe'"
                autocomplete="new-password" />

            <v-text-field v-model="passwordConfirmation" :type="showPassword ? 'text' : 'password'"
                label="Confirmar palavra-passe" prepend-inner-icon="mdi-lock-check" variant="outlined"
                :rules="passwordConfirmationRules"
                :aria-label="showPassword ? 'Esconder confirmação de palavra-passe' : 'Mostrar confirmação de palavra-passe'"
                autocomplete="new-password" />

            <AuthButton :loading="isLoading" text="Registar" />

            <div class="text-center mt-4 text-caption">
                Já tem conta?
                <v-btn variant="plain" color="blue" size="small" class="text-capitalize" to="/login"
                    aria-label="Já tem conta? Clique aqui para iniciar sessão.">
                    Iniciar sessão
                </v-btn>
            </div>
        </v-form>
    </AuthLayout>
</template>