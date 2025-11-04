<template>
  <v-sheet
    class="pa-5 mx-auto d-flex flex-column ga-3 border-md rounded-lg border-primary"
  >
    <template v-for="(item, i) in [
      {
        icon: 'mdi-calendar-month-outline',
        title: '開催日時',
        mainText: '2026年5月30日(土)・5月31日(日) 10:00〜19:00',
        subText: '開場 9:30／開会式 10:00／閉会式 18:20'
      },
      {
        icon: 'mdi-map-marker-outline',
        title: '会場',
        mainText: '東京エレクトロンホール宮城\n会議室棟 601・602会議室',
        subText: '宮城県仙台市青葉区国分町3-3-7',
      },
      {
        icon: 'mdi-train',
        title: 'アクセス',
        mainText: '仙台市営地下鉄南北線「勾当台公園駅」下車\n（「公園出口2」より徒歩5分）',
      },
      {
        icon: 'mdi-currency-jpy',
        title: '参加費',
        mainText: 'DM・GM参加 &yen;0 ／ 一般 &yen;1,000 ／ 学生 &yen;500',
      }
    ]" :key="i">
      <UiMultiLineTextWithIcon
        :icon=item.icon
        :title=item.title
        :main-text=item.mainText
        :sub-text=item.subText
      />
    </template>
    <div
      class="d-flex flex-column align-center justify-center ga-1"
    >
      <UtilPhase>
        <template v-for="k in ['GM1', 'GM2']" :key="i" v-slot:[k]>
          <v-btn
            block
            color="accent"
            rounded="lg"
            elevation="0"
            append-icon="mdi-open-in-new"
            class="font-weight-bold"
            :to="{ hash: '#schedule' }"
            :style="{ '--v-activated-opacity': 0 }"
          ><b>GM応募する</b></v-btn>
        </template>
        <template v-for="k in ['PL1', 'PL2']" :key="i" v-slot:[k]>
          <v-btn
            block
            color="accent"
            rounded="lg"
            elevation="0"
            append-icon="mdi-open-in-new"
            class="font-weight-bold"
            :to="{ hash: '#schedule' }"
            :style="{ '--v-activated-opacity': 0 }"
          ><b>PL応募する</b></v-btn>
        </template>
      </UtilPhase>
      <p
        v-if="isEventPhaseActive.length"
        class="mt-1 text-textSecondary text-body-2 text-center"
        v-text="'※外部フォームに移動します'"
      />
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
const { isEventPhaseActive } = useEventPhase()
</script>

<style scoped>
</style>
