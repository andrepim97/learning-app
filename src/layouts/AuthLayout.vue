<!-- src/layouts/AuthLayout.vue -->
<template>
  <v-app>
    <v-main>
      <v-container fluid class="d-flex align-center justify-center fill-height">
        <v-card
          class="pa-6 mx-auto"
          max-width="450"
          elevation="10"
          rounded="lg"
        >
          <v-card-title
            v-if="title"
            class="text-h5 text-center mb-4 font-weight-medium"
          >
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
/* Estilos opcionais para personalização futura */
</style>
