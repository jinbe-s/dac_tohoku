<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12" class="d-flex flex-column justify-center align-center">
        <v-img :src="icon" :width="300" :max-height="300" contain class="mx-auto" />
        <SectionEventInfo />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" dense>
        <v-row dense>
          <v-col cols="12">
            <TextMainTitle title="新着情報" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="6">
            <SectionNewInfo />
          </v-col>
          <v-col cols="12" md="6">
            <LazySectionTwitterTimeline />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" dense>
        <v-row dense>
          <v-col cols="12">
            <TextMainTitle title="スケジュール" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="6">

          </v-col>
          <v-col cols="12" md="6">

          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
