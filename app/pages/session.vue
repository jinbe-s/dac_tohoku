<template>
  <ClientOnly>
    <v-container>
      <template v-if="pending || error">
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
              { title: '5月23日セッション', list: 'day1List', detail: 'day1Detail' },
              { title: '5月24日セッション', list: 'day2List', detail: 'day2Detail' },
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
          { title: '5月23日 セッション一覧', items: day1List, sectionId: 'day1List' },
          { title: '5月24日 セッション一覧', items: day2List, sectionId: 'day2List' },
          { title: '両日卓 セッション一覧', items: wList, sectionId: 'wList' },
        ]">
          <v-row>
            <v-col cols="12">
              <TextMainTitle :title="item.title" :section-id="item.sectionId" />
              <SectionSessionListTable
                :items="item.items"
                class="mt-5"
              />
            </v-col>
          </v-row>
        </template>
        <template v-for="item in [
          { title: '5月23日 セッション詳細', items: day1List, sectionId: 'day1Detail' },
          { title: '5月24日 セッション詳細', items: day2List, sectionId: 'day2Detail' },
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

const { getSessionList } = useSessionList()
const { data, pending, error } = await getSessionList()

const allList = computed<SessionListResponse[]>(() => data.value ?? [])
const day1List = computed(() => allList.value.filter(r => r.day_1 === 1))
const day2List = computed(() => allList.value.filter(r => r.day_2 === 1))
const wList = computed(() => allList.value.filter(r => r.both === 1))
</script>

<style lang="scss" scoped>

</style>
