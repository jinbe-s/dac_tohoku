<template>
  <component :is="'script'" type="application/ld+json" v-html="jsonLdString" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  jsonLd: Record<string, any>
}>()

const jsonLdString = computed(() => JSON.stringify(props.jsonLd))
</script>
