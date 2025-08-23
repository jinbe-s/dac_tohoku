<template>
  <v-sheet
    class="pa-3 mx-auto border-md rounded-lg"
  >
    <div class="my-0 text-center">
      <p><strong class="font-weight-bold text-subtitle-1 text-primary">{{ title }}</strong></p>
      <div class="d-flex align-center justify-center ga-3 mt-2">
        <v-btn
          :to="{ hash: `#${listHash}` }"
          append-icon="mdi-chevron-down"
          rounded="lg"
          elevation="0"
          variant="tonal"
          :style="{ color: 'rgb(var(--v-theme-textPrimary))' }"
        >一覧</v-btn>
        <v-btn
          :to="{ hash: `#${detailHash}` }"
          append-icon="mdi-chevron-down"
          rounded="lg"
          elevation="0"
          variant="tonal"
          :style="{ color: 'rgb(var(--v-theme-textPrimary))' }"
        >詳細</v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  title: string
  listHash: string
  detailHash: string
}>(), { listHash: '', detailHash: '' })
</script>

<style lang="scss" scoped>

</style>
