<template>
  <v-card class="rounded-xl">
    <v-card-title class="text-h6">{{ title }}</v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>()
</script>
