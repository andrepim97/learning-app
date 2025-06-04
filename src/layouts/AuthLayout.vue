<!-- src/layouts/AuthLayout.vue -->
<template>
  <v-app>
    <v-main>
      <v-container
        fluid
        class="d-flex align-center justify-center fill-height"
      >
        <v-card
          max-width="500"
          class="pa-6 elevation-10"
        >
          <slot />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// Layout para as views de autenticação com Vuetify
</script>

<style scoped>
/* Estilos personalizados (opcional) */
</style>
