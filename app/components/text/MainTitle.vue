<template>
  <h2 class="mt-4 text-h5 font-weight-bold title-wrapper px-5 anchor" :id="sectionId">
    <span class="">{{ title }}</span>
  </h2>
</template>

<script lang="ts" setup>
const props = defineProps<{ title: string, sectionId?: string }>()
</script>

<style scoped>
.title-wrapper {
  border-left: 8px solid rgb(var(--v-theme-primary));
}
</style>
