<template>
  <v-alert
    v-if="edition.status === 'closed'"
    type="info"
    variant="tonal"
    border="start"
    class="mb-6"
  >
    <!--
      append スロットは独立したグリッド列になり、狭い画面で本文が細い列に潰れる。
      本文側にまとめて、横並び／縦積みを自前で切り替える。
    -->
    <div class="d-flex flex-column flex-md-row align-md-center ga-3">
      <div class="flex-grow-1">
        <p class="font-weight-bold mb-1">{{ edition.name }} は終了しました</p>
        <p class="text-body-2 mb-0">
          このページに掲載している開催日時・会場などは{{ edition.year }}年開催時の情報です。<br>
          {{ edition.year + 1 }}年の開催情報は準備中です。決まり次第このページでお知らせします。
        </p>
      </div>
      <v-btn
        color="primary"
        variant="flat"
        rounded="lg"
        append-icon="mdi-chevron-right"
        class="flex-shrink-0 align-self-start align-self-md-center"
        :to="edition.sessionsPath"
      >{{ edition.year }}年の卓一覧を見る</v-btn>
    </div>
  </v-alert>
</template>

<script lang="ts" setup>
import type { EventEdition } from '~/config/editions'

defineProps<{
  edition: EventEdition
}>()
</script>
