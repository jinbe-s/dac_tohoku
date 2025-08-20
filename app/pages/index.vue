<template>
  <v-container class="py-10">
    <v-row dense>
      <v-col cols="12" md="6">
        <div class="d-flex flex-column ga-2">
          <InlineIconText
            v-if="isEventPhaseActive.length"
            icon="mdi-information-outline"
            :text="phaseText"
            color="primary"
          />
          <h1 class="text-h4 text-primary text-center-sm">
            <strong>DAC TOHOKU 2026</strong>
          </h1>
          <p class="my-0 text-textSecondary">
            DAC TOHOKUは年に一度、宮城県仙台市で開催するTRPGコンベンションです。<br>
            D&D(ダンジョンズ&ドラゴンズ)やpathfinderなど、D20システムを楽しむイベントです。<br>
          </p>
          <div class="d-flex justify-center align-center ga-4 mt-4">
            <UtilPhase>
              <template #GM1 #GM2>
                <v-btn
                  color="primary"
                  rounded="lg"
                  elevation="0"
                  append-icon="mdi-chevron-right"
                  href="https://google.com"
                  :style="{ '--v-activated-opacity': 0 }"
                >GM応募案内</v-btn>
              </template>
              <template #PL1 #PL2>
                <v-btn
                  color="primary"
                  rounded="lg"
                  elevation="0"
                  append-icon="mdi-chevron-right"
                  href="https://google.com"
                  :style="{ '--v-activated-opacity': 0 }"
                >PL応募詳細</v-btn>
              </template>
            </UtilPhase>
            <v-btn
              color="primary"
              variant="outlined"
              rounded="lg"
              elevation="0"
              :to="{ hash: '#schedule' }"
              :style="{ '--v-activated-opacity': 0, 'background': '#fff' }"
            >スケジュール</v-btn>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <SectionEventInfo />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" dense>
        <v-row>
          <v-col cols="12">
            <TextMainTitle title="新着情報" sectionId="news" />
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
        <v-row>
          <v-col cols="12">
            <TextMainTitle title="スケジュール" section-id="schedule" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="6">
            <TextSubTitle title="開催日まで" />
            <SectionScheduleList
              class="mt-3"
              :items="[
                { name: '2/7(土)', title: 'GMエントリー開始' },
                { name: '3/1(日)', title: 'GMエントリー終了' },
                { name: '3月前半', title: 'プレイヤー募集開始予定' },
                { name: '4月前半', title: '卓分け発表'},
              ]"
            />
          </v-col>
          <v-col cols="12" md="6">
            <TextSubTitle title="当日" />
            <SectionScheduleList
              class="mt-3"
              :items="[
                {
                  name: '09:30',
                  title: '開場',
                  text: 'お手伝いいただける方は09:00からの設営補助をお願いします',
                },
                {
                  name: '10:00',
                  title: '受付開始',
                  text: ''
                },
                {
                  name: '10:30',
                  title: '開会式',
                  text: '',
                },
                {
                  name: '18:15',
                  title: 'セッション終了',
                  text: '',
                },
                {
                  name: '18:20',
                  title: '閉会式',
                  text: '',
                },
              ]"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" dense>
        <v-row>
          <v-col cols="12">
            <TextMainTitle title="参加費" section-id="fee" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" sm="4">
            <v-sheet
              class="pa-2 mx-auto border-md rounded-lg"
            >
              <p class="my-0 text-center">
                <string class="font-weight-bold">GM/DM参加</string>
                <span
                  class="text-primary text-h5 font-weight-bold"
                  style="display: block;"
                >&yen;0</span>
                <span class="text-body-2">イベント参加費は不要</span>
              </p>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet
              class="pa-2 mx-auto border-md rounded-lg"
            >
              <p class="my-0 text-center">
                <string class="font-weight-bold">一般参加</string>
                <span
                  class="text-primary text-h5 font-weight-bold"
                  style="display: block;"
                >&yen;1,000</span>
                <span class="text-body-2">当日受付で支払い</span>
              </p>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-sheet
              class="pa-2 mx-auto border-md rounded-lg"
            >
              <p class="my-0 text-center">
                <string class="font-weight-bold">学生参加</string>
                <span
                  class="text-primary text-h5 font-weight-bold"
                  style="display: block;"
                >&yen;500</span>
                <span class="text-body-2">要学生証提示</span>
              </p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" dense>
        <v-row>
          <v-col cols="12">
            <TextMainTitle title="アクセス" section-id="access" />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12" md="6"></v-col>
          <v-col cols="12" md="6"></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import InlineIconText from '~/components/ui/InlineIconText.vue'

const { isEventPhaseActive, isActive } = useEventPhase()
const plText = computed(() => isActive('PL2').value ? 'PL2次' : isActive('PL1').value ? 'PL' : '')
const gmText = computed(() => isActive('GM2').value ? 'GM2次' : isActive('GM1').value ? 'GM' : '')
const phaseText = computed(() => {
  const parts = [plText.value, gmText.value].filter(Boolean) as string[]
  return parts.length ? `${parts.join('・')}応募募集中` : ''
})

useSeoMeta({
  title: 'TOP',
})
</script>

<style lang="scss" scoped>

</style>
