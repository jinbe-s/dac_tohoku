<template>
  <v-container class="py-10">
    <v-img :src="icon" :width="300" :max-height="300" contain class="mx-auto" />

    <p class="my-0 text-center">
      <DateText value="2026/05/06" output="m月d日" />
    </p>

    <v-divider color="primary" thickness="3" />
  </v-container>
</template>

<script setup lang="ts">
import icon from '~/assets/icon.png'
useSeoMeta({
  title: 'TOP',
})
</script>

<style lang="scss" scoped>

</style>
