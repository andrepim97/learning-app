<script setup>
import { ref, provide } from 'vue'

const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('')

const showSnackbar = (message, color = 'info') => {
  snackbarText.value = message
  snackbarColor.value = color
  snackbar.value = true
}

provide('showSnackbar', showSnackbar);

</script>

<template>
  <v-app>
    <router-view />

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000" bottom right>
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>