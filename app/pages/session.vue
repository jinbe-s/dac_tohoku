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
            <p class="text-center font-h3 font-weight-bold">卓一覧は準備中です</p>
          </v-col>
        </v-row>
      </template>

      <template v-else>
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
                :pl2-table-ids="PL2_TABLE_IDS"
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
import { PL2_TABLE_IDS } from '~/config/pl2Sessions'

const route = useRoute()
const { public: pub } = useRuntimeConfig()
const previewUrl = route.query.preview === '1' ? pub.sessionList2 : undefined
const { getSessionList } = useSessionList(previewUrl)
const { data, pending, error } = await getSessionList()

const allList = computed<SessionListResponse[]>(() => data.value ?? [])
const day1List = computed(() => allList.value.filter(r => r.day_1 === 1))
const day2List = computed(() => allList.value.filter(r => r.day_2 === 1))
const wList = computed(() => allList.value.filter(r => r.both === 1))

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

useSiteMeta({
  title: 'セッション一覧・卓情報',
  description: 'DAC東北 2026のセッション一覧。5月30日・31日開催の卓情報。両日参加可能な卓も掲載。GM情報、参加人数、レベル、システム、シナリオ概要。',
  keywords: 'DAC東北,セッション,卓一覧,GM,シナリオ,参加人数,5月30日,5月31日'
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
