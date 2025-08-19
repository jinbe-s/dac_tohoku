<template>
  <div class="d-flex align-center justify-start" :class="colorClass">
    <v-icon :icon="icon" :size="size" class="mr-2" />
    <span class="font-weight-bold">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  icon: string
  text: string
  color?: string
  size?: number | string
}>(), {
  color: 'primary',
  size: 18
})

const colorClass = computed(() => `text-${props.color}`)
</script>
