<template>
  <v-sheet
    class="pa-2 mx-auto border-md rounded-lg"
  >
    <p class="my-0 text-center">
      <strong class="font-weight-bold">{{ title }}</strong>
      <span
        class="text-primary text-h5 font-weight-bold d-block"
      >&yen;{{ price }}</span>
      <span v-if="text" class="text-body-2">{{ text }}</span>
    </p>
  </v-sheet>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title: string
  price: string
  text?: string
}>(), { text: '' })
</script>

<style lang="scss" scoped>

</style>
