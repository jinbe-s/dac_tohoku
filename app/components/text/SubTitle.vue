<template>
  <h3 class="text-h6 font-weight-bold title-wrapper text-center text-primary">
    <span class="title-inner px-3">{{ title }}</span>
  </h3>
</template>

<script lang="ts" setup>
const props = defineProps<{ title: string }>()
</script>

<style scoped>
.title-wrapper {
  position: relative;
}
.title-wrapper::after {
  border-top: 2px solid rgb(var(--v-theme-primary));
  content: '';
  display: block;
  position: absolute;
    top: 50%;
    left: 25%;
  width: 50%;
  z-index: 1;
}
.title-inner {
  background: rgb(var(--v-theme-background));
  display: inline-block;
  position: relative;
  z-index: 100;
}
</style>
