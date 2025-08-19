<template>
  <v-sheet
    class="pa-5 mx-auto d-flex flex-column ga-3 border-md rounded-lg border-primary"
  >
    <div class="d-flex justify-start align-top">
      <v-icon
        icon="mdi-calendar-month-outline"
        small
        color="primary"
      />
      <div class="ml-2">
        <p class="my-0 text-body-2 text-textSecondary text-weight-bold">
          <strong>開催日時</strong>
        </p>
        <p class="my-0 ">
          <strong>2026年5月23日(土)・5月24日(日)</strong>
          10:00〜19:00
        </p>
        <p class="my-0 text-body-2 text-textSecondary">
          開場 9:30／開会式 10:00／閉会式 18:20
        </p>
      </div>
    </div>
    <div class="d-flex justify-start align-top">
      <v-icon
        icon="mdi-map-marker-outline"
        small
        color="primary"
      />
      <div class="ml-2">
        <p class="my-0 text-body-2 text-textSecondary text-weight-bold">
          <strong>会場</strong>
        </p>
        <p class="my-0 ">
          <strong>エル・パーク仙台 セミナーホール1・2</strong>
        </p>
        <p class="my-0 text-body-2 text-textSecondary">
          〒980-8555　仙台市青葉区一番町4-11-1<br>141ビル（仙台三越定禅寺通り館）5階・6階
        </p>
      </div>
    </div>
    <div class="d-flex justify-start align-top">
      <v-icon
        icon="mdi-train"
        small
        color="primary"
      />
      <div class="ml-2">
        <p class="my-0 text-body-2 text-textSecondary text-weight-bold">
          <strong>アクセス</strong>
        </p>
        <p class="my-0 ">
          <strong>仙台市地下鉄南北線「勾当台公園駅」下車（「公園出口2」より徒歩2分）</strong>
        </p>
      </div>
    </div>
    <div class="d-flex justify-start align-top">
      <v-icon
        icon="mdi-currency-jpy"
        small
        color="primary"
      />
      <div class="ml-2">
        <p class="my-0 text-body-2 text-textSecondary text-weight-bold">
          <strong>参加費</strong>
        </p>
        <p class="my-0 ">
          <strong>DM・GM参加 <span>&yen;0</span> ／ 一般 <span>&yen;1,000</span> ／ 学生 <span>&yen;500</span></strong>
        </p>
        <p class="my-0 text-body-2 text-textSecondary">

        </p>
      </div>
    </div>
    <div
      class="d-flex flex-column align-center justify-center ga-1"
    >
      <UtilPhase>
        <template #GM1 #GM2>
          <v-btn
            block
            color="accent"
            rounded="lg"
            elevation="0"
            append-icon="mdi-open-in-new"
            class="text-weight-bold"
            :to="{ hash: '#schedule' }"
            :style="{ '--v-activated-opacity': 0 }"
          ><b>GM応募する</b></v-btn>
        </template>
        <template #PL1 #PL2>
          <v-btn
            block
            color="accent"
            rounded="lg"
            elevation="0"
            append-icon="mdi-open-in-new"
            class="text-weight-bold"
            :to="{ hash: '#schedule' }"
            :style="{ '--v-activated-opacity': 0 }"
          ><b>PL応募する</b></v-btn>
        </template>
      </UtilPhase>
      <p
        v-if="isEventPhaseActive.length"
        class="mt-1 text-textSecondary text-body-2 text-center"
      >※外部フォームに移動します</p>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
const { isEventPhaseActive } = useEventPhase()
</script>

<style scoped>
</style>
