<template>
  <ClientOnly>
    <v-btn
      icon
      class="scroll-top-btn"
      color="primary"
      @click="scrollToTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>

    <v-container class="py-10">
      <template v-if="pending || error || allList.length === 0">
        <v-row>
          <v-col cols="12">
            <p class="text-center font-h3 font-weight-bold">データがありません</p>
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <v-card variant="tonal" color="primary" rounded="lg" class="mb-6 py-4 px-4">
          <div class="d-flex flex-column align-center text-center">
            <div class="text-body-1 font-weight-bold">{{ year }}年に実施した際の内容です</div>
          </div>
        </v-card>

        <v-row v-if="edition">
          <v-col cols="12">
            <TextMainTitle title="開催情報" section-id="eventInfo" />
          </v-col>
          <v-col cols="12">
            <SectionEventInfo :edition="edition" variant="archive" />
          </v-col>
          <v-col v-for="stat in stats" :key="stat.title" cols="12" sm="4">
            <v-sheet class="pa-4 mx-auto border-md rounded-lg text-center">
              <p class="my-0">
                <strong class="font-weight-bold">{{ stat.title }}</strong>
                <span class="text-primary text-h5 font-weight-bold d-block">{{ stat.value }}</span>
                <span v-if="stat.text" class="text-body-2">{{ stat.text }}</span>
              </p>
            </v-sheet>
          </v-col>
        </v-row>

        <div class="my-3">
          <v-row>
            <template v-for="item in [
              { title: '5月30日セッション', list: 'day1List', detail: 'day1Detail' },
              { title: '5月31日セッション', list: 'day2List', detail: 'day2Detail' },
              { title: '両日卓セッション', list: 'wList', detail: 'wDetail' },
            ]">
              <v-col cols="12" md="4">
                <UiSessionCard
                  :title="item.title"
                  :list-hash="item.list"
                  :detail-hash="item.detail"
                />
              </v-col>
            </template>
          </v-row>
        </div>
        <template v-for="item in [
          { title: '5月30日 セッション一覧', items: day1List, sectionId: 'day1List' },
          { title: '5月31日 セッション一覧', items: day2List, sectionId: 'day2List' },
          { title: '両日卓 セッション一覧', items: wList, sectionId: 'wList' },
        ]">
          <v-row>
            <v-col cols="12">
              <TextMainTitle :title="item.title" :section-id="item.sectionId" />
              <SectionSessionListTable
                :items="item.items"
                :pl2-table-ids="pl2TableIds"
                class="mt-5"
              />
            </v-col>
          </v-row>
        </template>
        <template v-for="item in [
          { title: '5月30日 セッション詳細', items: day1List, sectionId: 'day1Detail' },
          { title: '5月31日 セッション詳細', items: day2List, sectionId: 'day2Detail' },
          { title: '両日卓 セッション詳細', items: wList, sectionId: 'wDetail' },
        ]">
          <v-row>
            <v-col cols="12">
              <TextMainTitle :title="item.title" :section-id="item.sectionId" />
              <SectionSessionDetail
                :items="item.items"
              />
            </v-col>
          </v-row>
        </template>
      </template>
    </v-container>
  </ClientOnly>
</template>

<script lang="ts" setup>
import type { SessionListResponse } from '~/composables/useSessionList'
import { useSessionListFromJson } from '~/composables/useSessionList'
import { PL2_TABLE_IDS } from '~/config/pl2Sessions'
import { EDITIONS, type EditionKey } from '~/config/editions'

const route = useRoute()
const year = route.params.year as string

// 開催情報が登録されている年だけ、卓一覧の上に開催情報と参加実績を出す
const edition = EDITIONS[year as EditionKey]

const stats = computed(() => edition
  ? [
      { title: '卓数', value: `${edition.stats.sessionCount}卓`, text: '' },
      { title: 'DM/GM', value: `${edition.stats.gmCount}名`, text: '' },
      {
        title: '参加プレイヤー',
        value: `${edition.stats.playerCount}名`,
        text: `延べ${edition.stats.playerEntryCount}名`
      }
    ]
  : [])

const { getSessionList } = useSessionListFromJson(`/data/sessions_${year}.json`)
const { data, pending, error } = await getSessionList()

const allList = computed<SessionListResponse[]>(() => data.value ?? [])
const day1List = computed(() => allList.value.filter(r => r.day_1 === 1))
const day2List = computed(() => allList.value.filter(r => r.day_2 === 1))
const wList = computed(() => allList.value.filter(r => r.both === 1))

const pl2TableIds = year === '2026' ? PL2_TABLE_IDS : []

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

useSiteMeta({
  title: `${year}年 セッション一覧・卓情報`,
  description: `DAC東北 ${year}年のセッション一覧。卓情報・GM情報・シナリオ概要。`,
  keywords: `DAC東北,${year},セッション,卓一覧,GM,シナリオ`
})
</script>

<style lang="scss" scoped>
.scroll-top-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  border-radius: 4px !important;
}
</style>
