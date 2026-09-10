<template>
  <!-- Event JSON-LD Schema -->
  <UtilJsonLd :json-ld="eventSchema" />
  <!-- Organization JSON-LD Schema -->
  <UtilJsonLd :json-ld="organizationSchema" />

  <v-container class="py-10">
    <SectionEditionNotice :edition="edition" />
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
            <strong>{{ edition.name }}</strong>
          </h1>
          <p class="my-0 text-textSecondary">
            DAC東北は宮城県仙台市で開催するTRPGコンベンションです。<br>
            D&D(ダンジョンズ&ドラゴンズ)やpathfinderなど、D20システムを楽しむイベントです。<br>
          </p>
          <div class="d-flex flex-column flex-sm-row justify-center align-center ga-2 ga-sm-4 my-4 button-container">
            <UtilPhase>
              <template v-for="k in ['GM1', 'GM2']" :key="k" v-slot:[k]>
                <v-btn
                  size="large"
                  color="accent"
                  rounded="lg"
                  elevation="2"
                  append-icon="mdi-chevron-right"
                  to="/about#dmRecruit"
                  class="button-item font-weight-bold"
                >DM/GM募集要項</v-btn>
              </template>
              <template v-for="k in ['PL1', 'PL2']" :key="k" v-slot:[k]>
                <v-btn
                  size="large"
                  color="accent"
                  rounded="lg"
                  elevation="2"
                  append-icon="mdi-chevron-right"
                  to="/about#plRecruit"
                  class="button-item font-weight-bold"
                >PL募集要項</v-btn>
              </template>
            </UtilPhase>
            <v-btn
              color="primary"
              variant="outlined"
              rounded="lg"
              elevation="0"
              :to="{ hash: '#schedule' }"
              :style="{ 'background': '#fff' }"
              class="button-item"
            >スケジュール</v-btn>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <SectionEventInfo :edition="edition" />
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
        <SectionTwitterTimeline />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TextMainTitle title="スケジュール" section-id="schedule" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <TextSubTitle title="開催日まで(予定)" />
        <SectionScheduleList
          class="mt-3"
          :items="[
            // { name: '2026/1/17(土)', title: 'GMエントリー開始' },
            { name: '2026/2/15(日)', title: 'GMエントリー終了' },
            { name: '2026/2/23(月祝)', title: 'プレイヤー募集開始' },
            { name: '2026/3/22(日)', title: 'プレイヤー募集終了'},
            { name: '2026/3月後半〜4月頭', title: '卓分け発表' }
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
            { name: '18:20', title: 'セッション終了' },
            { name: '18:30', title: '閉会式' },
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
      <template v-for="(item, i) in edition.fees" :key="i">
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
        <TextMainTitle title="協賛" section-id="sponsor" />
        <p class="mt-2 text-body-2 text-textSecondary">プレゼント抽選会の景品をご提供いただいている企業・団体様です。(50音順)</p>
      </v-col>
    </v-row>
    <SectionSponsorList />
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
  </v-container>
</template>

<script setup lang="ts">
import InlineIconText from '~/components/ui/InlineIconText.vue'
import { DISPLAY_EDITION, getEdition } from '~/config/editions'

const edition = getEdition(DISPLAY_EDITION)

const { isEventPhaseActive, isActive } = useEventPhase()
const plText = computed(() => isActive('PL2').value ? 'PL2次' : isActive('PL1').value ? 'PL' : '')
const gmText = computed(() => isActive('GM2').value ? 'GM2次' : isActive('GM1').value ? 'GM' : '')
const phaseText = computed(() => {
  const parts = [plText.value, gmText.value].filter(Boolean) as string[]
  return parts.length ? `${parts.join('・')}応募募集中` : ''
})

useSiteMeta({
  title: 'DAC東北 - 仙台のTRPGコンベンション',
  description: `DAC東北は宮城県仙台市で開催するTRPGコンベンションです。${edition.name}は終了しました（卓一覧を公開中）。${edition.year + 1}年の開催情報は準備中です。`,
  keywords: 'DAC東北,TRPG,コンベンション,仙台,D&D,Pathfinder,D20システム'
})

// Event JSON-LD Schema
const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: edition.name,
  startDate: edition.startDate,
  endDate: edition.endDate,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: `${edition.venue.name} ${edition.venue.room}`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: edition.venue.region,
      addressLocality: edition.venue.locality,
      streetAddress: edition.venue.street,
      postalCode: edition.venue.postalCode
    }
  },
  description: edition.description,
  organizer: {
    '@type': 'Organization',
    name: 'DAC東北',
    url: 'https://dac-tohoku.com'
  },
  offers: edition.fees.map(fee => ({
    '@type': 'Offer',
    name: fee.title,
    price: fee.price.replace(/,/g, ''),
    priceCurrency: 'JPY'
  }))
}

// Organization JSON-LD Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DAC東北',
  url: 'https://dac-tohoku.com',
  logo: 'https://dac-tohoku.com/icon.png',
  sameAs: [
    'https://x.com/dac_tohoku'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    url: 'https://dac-tohoku.com/contact'
  }
}
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
