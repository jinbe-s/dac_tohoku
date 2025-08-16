<template>
  <v-card class="pa-4">
    <div class="text-subtitle-1 mb-2">{{ user.name }}</div>
    <div class="text-body-2 mb-4">ID: {{ user.id }}</div>
    <v-btn @click="onSelect">選択</v-btn>
  </v-card>
</template>

<script setup lang="ts">
type User = { id: number; name: string }
const props = defineProps<{ user: User }>()
const emit = defineEmits<{ (e: 'select', user: User): void }>()
const onSelect = () => emit('select', props.user)
</script>
