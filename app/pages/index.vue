<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12" md="6">
        <div class="d-flex flex-column ga-2">
          <InlineIconText
            v-if="isEventPhaseActive.length"
            icon="mdi-information-outline"
            :text="phaseText"
            color="primary"
          />
          <h1 class="text-h4 text-primary text-center-sm">
            <strong>DAC東北 2026</strong>
          </h1>
          <p class="my-0 text-textSecondary">
            DAC東北は宮城県仙台市で開催するTRPGコンベンションです。<br>
            D&D(ダンジョンズ&ドラゴンズ)やpathfinderなど、D20システムを楽しむイベントです。<br>
          </p>
          <div class="d-flex flex-column flex-sm-row justify-center align-center ga-2 ga-sm-4 my-4 button-container">
            <UtilPhase>
              <template v-for="k in ['GM1', 'GM2']" :key="k" v-slot:[k]>
                <v-btn
                  color="primary"
                  rounded="lg"
                  elevation="0"
                  append-icon="mdi-chevron-right"
                  to="/about#dmRecruit"
                  :style="{ '--v-activated-opacity': 0 }"
                  class="button-item"
                >GM応募案内</v-btn>
              </template>
              <template v-for="k in ['PL1', 'PL2']" :key="k" v-slot:[k]>
                <v-btn
                  color="primary"
                  rounded="lg"
                  elevation="0"
                  append-icon="mdi-chevron-right"
                  to="/about#plRecruit"
                  :style="{ '--v-activated-opacity': 0 }"
                  class="button-item"
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
              class="button-item"
            >スケジュール</v-btn>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <SectionEventInfo />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TextMainTitle title="新着情報" sectionId="news" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <SectionNewInfo />
      </v-col>
      <v-col cols="12" md="6">
        <LazySectionTwitterTimeline />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TextMainTitle title="スケジュール" section-id="schedule" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <TextSubTitle title="開催日まで" />
        <SectionScheduleList
          class="mt-3"
          :items="[
            { name: '2/7(土)', title: 'GMエントリー開始' },
            { name: '2/23(月祝)', title: 'GMエントリー終了(予定)' },
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
            { name: '10:00', title: '受付開始' },
            { name: '10:30', title: '開会式' },
            { name: '18:15', title: 'セッション終了' },
            { name: '18:20', title: '閉会式' },
          ]"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TextMainTitle title="参加費" section-id="fee" />
      </v-col>
    </v-row>
    <v-row>
      <template v-for="(item, i) in [
        { title: 'GM/DM参加', price: '0', text: 'イベント参加費は不要' },
        { title: 'PL一般参加', price: '1,000', text: '当日受付で支払い' },
        { title: 'PL学生参加', price: '500', text: '要学生証提示' },
      ]" :key="i">
        <v-col cols="12" sm="4">
          <UiPriceCard
            :title="item.title"
            :price="item.price"
            :text="item.text"
          />
        </v-col>
      </template>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TextMainTitle title="アクセス" section-id="access" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <div class="d-flex flex-column ga-2">
          <div class="d-flex flex-column align-start">
            <p class="text-primary font-weight-bold">仙台市内から</p>
            <p>地下鉄「仙台駅」から泉中央方面に2駅、「<span>勾当台公園駅</span>」下車<br />（「公園出口2」より徒歩5分）</p>
          </div>
          <div class="d-flex flex-column align-start">
            <p class="text-primary font-weight-bold">JRから</p>
            <p>JR「仙台駅」から地下鉄「仙台駅」まで地下通路で連結(所要時間約5分)</p>
          </div>
          <div class="d-flex flex-column align-start">
            <p class="text-primary font-weight-bold">仙台空港から</p>
            <p>仙台空港アクセス線でJR「仙台駅」まで25分</p>
          </div>
          <a
            href="https://maps.app.goo.gl/XBmroP4LebawcYtw9"
            class="text-decoration-none"
            :style="{ color: 'rgb(var(--v-theme-primary))' }"
            target="_blank"
            rel="noopener noreferrer"
          >GoogleMapで開く<v-icon size="x-small" icon="mdi-open-in-new" /></a>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <v-sheet
          class="google-map border-md rounded-md"
        >
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1355.087202225877!2d140.86705721101046!3d38.26602494166104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f8a2830275eadc5%3A0xf6eb0b18d68b0a3a!2z5p2x5Lqs44Ko44Os44Kv44OI44Ot44Oz44Ob44O844Or5a6u5Z-O!5e0!3m2!1sja!2sjp!4v1762265089880!5m2!1sja!2sjp" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </v-sheet>
      </v-col>
    </v-row>
    <UtilPhase>
      <template v-for="k in ['GM1', 'GM2', 'PL1', 'PL2']" :key="k" v-slot:[k]>
        <v-row>
          <v-col cols="12">
            <SectionHowToJoin />
          </v-col>
        </v-row>
      </template>
    </UtilPhase>
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
// ボタンコンテナのレスポンシブ対応
.button-container {
  width: 100%;

  .button-item {
    // モバイル: 全幅
    width: 100%;

    // タブレット以上: 自動幅
    @media (min-width: 600px) {
      width: auto;
    }
  }
}

.google-map {
  position: relative;
  width: 100%;
  padding-top: 300px;
  height: 0;
}

.google-map iframe {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
