<template>
  <v-text-field
    type="number"
    :model-value="model"
    @update:model-value="model = Number($event)"
    class="max-w-40"
  />
</template>

<script setup lang="ts">
const model = defineModel<number>({ default: 0 })
</script>
