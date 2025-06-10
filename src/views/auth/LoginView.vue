<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue'
import AuthButton from '@/components/auth/AuthButton.vue'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '@/plugins/firebase';

const email = ref('')
const password = ref('')

const remember = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)

const router = useRouter()
const showSnackbar = inject('showSnackbar')

const login = async () => {

    isLoading.value = true // Ativa o estado de carregamento do botão
    try {
        // --- 1. Definir a persistência da sessão ANTES de fazer o login ---
        if (remember.value) {
            // Se "Lembrar-me" estiver marcado, usa persistência local (sessão duradoura)
            await setPersistence(auth, browserLocalPersistence);
        } else {
            // Se "Lembrar-me" NÃO estiver marcado, usa persistência de sessão (sessão apenas durante a tab)
            await setPersistence(auth, browserSessionPersistence);
        }

        // --- 2. Realizar a chamada de login com o Firebase ---
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        console.log('Login Firebase bem-sucedido:', user);
        showSnackbar('Login efetuado com sucesso!', 'success');

        router.push({ name: 'dashboard' }); // Redireciona para a dashboard

    } catch (error) {
        console.error('Erro no login Firebase:', error);
        let errorMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente.';

        // O seu tratamento de erros do Firebase já está bom, vou mantê-lo igual
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Formato de email inválido.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'Esta conta foi desativada.';
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                errorMessage = 'Email ou palavra-passe incorretos.';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Credenciais inválidas. Verifique o seu email e palavra-passe.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Demasiadas tentativas de login. Tente novamente mais tarde.';
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Erro de rede. Verifique a sua conexão à internet.';
                break;
            default:
                errorMessage = 'Erro de autenticação: ' + error.message;
        }
        showSnackbar(errorMessage, 'error');
    } finally {
        isLoading.value = false; // Desativa o estado de carregamento
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
                variant="outlined" :rules="emailRules" autocomplete="username" />

            <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Palavra-passe" required
                prepend-inner-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" variant="outlined" :rules="passwordRules"
                :aria-label="showPassword ? 'Esconder palavra-passe' : 'Mostrar palavra-passe'"
                autocomplete="current-password" />

            <v-row align="center" class="mt-n2 mb-2">
                <v-col cols="auto">
                    <v-checkbox v-model="remember" label="Lembrar-me" hide-details density="compact"
                        aria-label="Manter sessão iniciada" />
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn variant="text" color="primary" size="small" class="text-capitalize" to="/forgot-password"
                        aria-label="Esqueceu-se da palavra-passe? Clique aqui para redefinir.">
                        Esqueceu-se da palavra-passe?
                    </v-btn>
                </v-col>
            </v-row>

            <AuthButton :loading="isLoading" text="Entrar" />

            <div class="text-center mt-4 text-caption">
                Ainda não tem conta?
                <v-btn variant="plain" color="blue" size="small" class="text-capitalize" to="/register"
                    aria-label="Criar conta. Clique aqui para se registar.">
                    Criar conta
                </v-btn>
            </div>
        </v-form>
    </AuthLayout>
</template>

<style scoped>
/* Se precisar de estilos específicos para a vista de login */
</style>