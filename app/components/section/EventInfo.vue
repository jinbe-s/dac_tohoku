<template>
  <v-sheet
    class="pa-5 mx-auto d-flex flex-column ga-3 border-md rounded-lg border-primary"
  >
    <div
      class="event-info-items"
      :class="{ 'event-info-items--inline': variant === 'archive' }"
    >
      <UiMultiLineTextWithIcon
        v-for="(item, i) in items"
        :key="i"
        class="event-info-item"
        :icon="item.icon"
        :title="item.title"
        :main-text="item.mainText"
        :sub-text="item.subText"
      />
    </div>
    <!-- 募集要項ボタンは開催予定の回にだけ出す（終了した回では常に非表示） -->
    <div
      v-if="edition.status === 'upcoming'"
      class="d-flex flex-column align-center justify-center ga-1"
    >
      <UtilPhase>
        <template v-for="k in ['GM1', 'GM2']" :key="k" v-slot:[k]>
          <v-btn
            block
            color="primary"
            variant="outlined"
            rounded="lg"
            elevation="0"
            append-icon="mdi-chevron-right"
            to="/about#dmRecruit"
          >DM/GM募集要項</v-btn>
        </template>
        <template v-for="k in ['PL1', 'PL2']" :key="k" v-slot:[k]>
          <v-btn
            block
            color="primary"
            variant="outlined"
            rounded="lg"
            elevation="0"
            append-icon="mdi-chevron-right"
            to="/about#plRecruit"
          >PL募集要項</v-btn>
        </template>
      </UtilPhase>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
import type { EventEdition } from '~/config/editions'

const props = withDefaults(defineProps<{
  edition: EventEdition
  /**
   * full    : 開催日時・会場・アクセス・参加費（これから参加する人向け）
   * archive : 開催日時・会場のみ（終了した回の記録用。当日の案内は不要なため省く）
   */
  variant?: 'full' | 'archive'
}>(), {
  variant: 'full'
})

const items = computed(() => {
  const base = [
    {
      icon: 'mdi-calendar-month-outline',
      title: '開催日時',
      mainText: props.edition.dateText,
      subText: props.edition.dateSubText
    },
    {
      icon: 'mdi-map-marker-outline',
      title: '会場',
      mainText: `${props.edition.venue.name}\n${props.edition.venue.room}`,
      subText: props.edition.venue.address
    }
  ]

  if (props.variant === 'archive') return base

  return [
    ...base,
    {
      icon: 'mdi-train',
      title: 'アクセス',
      mainText: props.edition.accessText,
      subText: ''
    },
    {
      icon: 'mdi-currency-jpy',
      title: '参加費',
      mainText: props.edition.feeText,
      subText: ''
    }
  ]
})
</script>

<style lang="scss" scoped>
.event-info-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

// archive では項目数が少ないため、横並びにして横幅を余らせない
@media (min-width: 960px) {
  .event-info-items--inline {
    flex-direction: row;
    gap: 32px;

    .event-info-item {
      flex: 1 1 0;
      min-width: 0;
    }
  }
}
</style>
