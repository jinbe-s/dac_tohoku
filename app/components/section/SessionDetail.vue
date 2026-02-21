<template>
  <div class="session-detail">
    <template v-if="items.length === 0">
      <p
        class="text-center text-body-1 font-weight-bold"
        v-text="'予定されているセッションはありません'"
      />
    </template>
    <v-sheet
      v-for="item in items"
      :id="item.table_id"
      :key="item.table_id"
      class="mx-auto mt-5 rounded-lg"
    >
      <div
        class="pa-3 bg-primary rounded-t-lg d-flex flex-column text-center"
      >
        <p
          class="text-h6"
          v-text="`${ item.table_id }：「${ item.session_name }」`"
        />
        <p
          class="text-body-2"
          v-text="`${ item.system_dm_name }：${ item.dm_name }`"
        />
        <p
          class="text-body-2"
          v-text="`システム：${ item.system_name }`"
        />
        <div class="d-flex align-center justify-center ga-3 mt-3 detail-chips-primary">
          <span
            :class="detailChipClass1"
            v-text="`${ item.session_lv }レベル`"
          />
          <span
            :class="detailChipClass1"
            v-text="`PL人数：${ item.session_number }`"
          />
          <span
            :class="detailChipClass1"
            v-text="`PC事前準備：${ item.is_preparation ? 'あり' : 'なし' }`"
          />
        </div>
        <div class="d-md-inline-flex align-center justify-center ga-3 mt-2 session-tendency">
          <div class="d-flex align-center justify-center ga-3">
            <span
              :class="[detailChipClass2, { 'opacity-30': !item.session_beginner }]"
              v-text="'TRPG初心者向け'"
            />
            <span
              :class="[detailChipClass2, { 'opacity-30': !item.system_beginner }]"
              v-text="'システム初心者向け'"
            />
          </div>
          <div class="d-flex align-center justify-center ga-3 mt-mobile-2">
            <span
              :class="[detailChipClass2, { 'opacity-30': !item.experience }]"
              v-text="'システム経験者向け'"
            />
            <span
              :class="[detailChipClass2, { 'opacity-30': !item.skilled }]"
              v-text="'システム熟練者向け'"
            />
          </div>
        </div>
      </div>
      <div
        class="pa-5 rounded-b-lg d-flex flex-column border-sm border-opacity-100 border-primary"
      >
        <div
          v-if="item.players.length !== 0"
          class="session-detail-item"
        >
          <p
            class="text-primary font-weight-bold"
            v-text="'参加プレイヤー（敬称略）'"
          />
          <p class="text-body-1" v-text="item.players.join('、')" />
        </div>
        <div class="session-detail-item">
          <p
            class="text-primary font-weight-bold"
            v-text="'自己紹介'"
          />
          <p
            class="text-body-1 pre-line"
            v-text="item.dm_introduce"
          />
        </div>
        <div class="session-detail-item">
          <p
            class="text-primary font-weight-bold"
            v-text="`${item.system_dm_name}経験`"
          />
          <p
            class="text-body-1 pre-line"
            v-text="item.dm_experience"
          />
        </div>
        <div class="session-detail-item">
          <p
            class="text-primary font-weight-bold"
            v-text="'レギュレーション'"
          />
          <p
            class="text-body-1 pre-line"
            v-text="item.regulation"
          />
        </div>
        <div class="session-detail-item">
          <p
            class="text-primary font-weight-bold"
            v-text="'シナリオ概要'"
          />
          <p
            class="text-body-1 pre-line"
            v-text="item.overview"
          />
        </div>
        <div class="session-detail-item">
          <p
            class="text-primary font-weight-bold"
            v-text="'シナリオ傾向 1(小)〜5(大)'"
          />
          <UiScenarioMetric label="戦闘" :value="item.session_battle" variant="bar" />
          <UiScenarioMetric label="物語性" :value="item.session_rp" variant="bar" />
          <UiScenarioMetric label="ギミック" :value="item.session_gimmick" variant="bar" />
          <template
            v-if="
              item.session_others.name.length > 0
              && item.session_others.point.length > 0
              && item.session_others.name.length === item.session_others.point.length
            "
            v-for="i in item.session_others.name.length"
          >
            <UiScenarioMetric
              :label="item.session_others.name[i-1] || ''"
              :value="item.session_others.point[i-1] || '0'"
              variant="bar"
            />
          </template>
        </div>
        <div class="session-detail-item">
          <p
            class="text-primary font-weight-bold"
            v-text="'英語対応'"
          />
          <p
            class="text-body-1 pre-line"
            v-text="item.english"
          />
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import type { SessionListResponse } from '~/composables/useSessionList'
const props = withDefaults(defineProps<{
  items: SessionListResponse[]
}>(), {})

const detailChipClass1 = 'py-1 px-3 rounded-lg bg-background text-center text-primary text-body-1 font-weight-bold'
const detailChipClass2 = 'py-1 px-3 rounded-lg border-sm border-background border-opacity-100 text-background text-body-1 font-weight-bold'
</script>

<style scoped lang="scss">
.session-detail-item + .session-detail-item {
  border-top: 2px dotted rgb(var(--v-theme-primary));
  padding-top: 8px;
  margin-top: 8px;
}

.pre-line {
  white-space: pre-line;
}

@media (max-width: 959px) {
  .mt-mobile-2 {
    margin-top: 8px !important;
  }

  .detail-chips-primary {
    flex-wrap: wrap;
    gap: 8px !important;
  }

  .detail-chips-primary span {
    font-size: 0.875rem !important;
    padding-left: 8px !important;
    padding-right: 8px !important;
  }

  .session-tendency span {
    min-width: 140px;
    font-size: 0.875rem !important;
  }
}

@media (max-width: 600px) {
  .session-tendency span {
    min-width: 130px;
    font-size: 0.75rem !important;
  }
}
</style>
