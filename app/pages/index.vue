<template>
  <v-container class="py-10">
    <BaseCard title="ようこそ">
      Nuxt + Vuetify コンポーネントの基本形です。
    </BaseCard>
    <UserCard :user="{ id: 1, name: 'Saito' }" @select="u => console.log(u)" />
    <CounterInput v-model="count" />
  </v-container>
</template>

<script setup lang="ts">
const count = ref(5)
useSeoMeta({
  title: 'TOP',
})
</script>
