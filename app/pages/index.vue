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
                >GM応募詳細</v-btn>
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
            <div style="margin-top: 400px">test</div>
          </v-col>
          <v-col cols="12" md="6">
            <TextSubTitle title="当日" />
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
            <v-card>test1</v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card>test2</v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card>test3</v-card>
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
