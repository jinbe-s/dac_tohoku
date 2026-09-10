<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12">
        <p class="text-center font-h3 font-weight-bold">卓一覧は準備中です</p>
        <p class="mt-3 text-center text-body-2 text-textSecondary">
          卓分けが決まり次第、このページで公開します。
        </p>
      </v-col>
    </v-row>

    <v-row v-if="archives.length">
      <v-col cols="12">
        <TextMainTitle title="過去の開催の卓一覧" section-id="archives" />
        <div class="mt-3 text-body d-flex flex-column ga-4">
          <NuxtLink
            v-for="item in archives"
            :key="item.key"
            :to="item.sessionsPath"
            class="text-decoration-none"
            :style="{ color: 'rgb(var(--v-theme-primary))' }"
          >{{ item.year }}年の卓一覧<v-icon size="x-small" icon="mdi-chevron-right" /></NuxtLink>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
// 次回の卓一覧を公開するときは useSessionList() でAPIから取得する表示に戻す。
// 終了した回の卓一覧は public/data/sessions_<年>.json に固定化され、/<年>/sessions で参照している。
// APIの利用枠を消費しないよう、このページからはAPIを呼ばない。
import { ARCHIVED_EDITIONS, DISPLAY_EDITION, getEdition } from '~/config/editions'

const displayEdition = getEdition(DISPLAY_EDITION)
const upcomingYear = displayEdition.status === 'closed'
  ? displayEdition.year + 1
  : displayEdition.year

const archives = ARCHIVED_EDITIONS.map(getEdition)

useSiteMeta({
  title: 'セッション一覧・卓情報',
  description: `${upcomingYear}年の卓一覧は準備中です。過去の開催の卓一覧は各年のアーカイブページからご覧いただけます。`,
  keywords: 'DAC東北,セッション,卓一覧,GM,シナリオ,準備中'
})
</script>
