<template>
  <v-app class="auth-layout-bg"> <v-main>
      <v-container fluid class="d-flex align-center justify-center fill-height">
        <v-card class="pa-6 mx-auto" max-width="450" min-width="320" elevation="6" rounded="xl" flat>
          <v-card-title v-if="title" class="text-h5 text-center mb-6 font-weight-bold text-primary">
            {{ title }}
          </v-card-title>

          <slot />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<style scoped>
/* AQUI! Esta é a definição da classe CSS */
.auth-layout-bg {
  /* Exemplo de fundo com gradiente linear suave */
  background: linear-gradient(to bottom right, #f0f2f5, #e0e5ec);
  /* Ou uma cor sólida ligeiramente fora do branco puro */
  /* background-color: #f5f7fa; */
}
</style>