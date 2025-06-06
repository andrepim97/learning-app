<!-- src/components/auth/AuthButton.vue -->
<template>
    <v-btn :loading="loading" :disabled="loading" :type="type" :color="color" :block="block" size="large" class="mt-2"
        @click="handleClick">
        <slot>{{ text }}</slot>
    </v-btn>
</template>

<script setup>
defineProps({
    text: { type: String, default: 'Submeter' },
    loading: { type: Boolean, default: false },
    type: { type: String, default: 'submit' },
    color: { type: String, default: 'primary' },
    block: { type: Boolean, default: true },
})

const emit = defineEmits(['click'])

const handleClick = (e) => emit('click', e)
</script>
