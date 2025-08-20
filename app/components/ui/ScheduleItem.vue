<template>
  <v-sheet
    class="pa-3 mx-auto d-flex ga-8 justify-start align-top border-md rounded-lg w-100"
  >
    <p class="my-0 text-primary font-weight-bold">
      {{ name }}
    </p>
    <div>
      <p class="my-0 font-weight-bold">{{ title }}</p>
      <p class="my-0 text-textSecondary text-body-2">{{ text }}</p>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  name: string
  title: string
  text?: string
}>(), { text: '' })
</script>

<style lang="scss" scoped>

</style>
