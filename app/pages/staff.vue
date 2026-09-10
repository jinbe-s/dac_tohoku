<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12">
        <TextMainTitle title="スタッフ一覧" section-id="staffList" />
        <div class="mt-3 text-body d-flex flex-column ga-2">
          <p>代表：さいとう</p>
          <p>副代表：シズ</p>
          <p>スタッフ：うどん</p>
          <p>少人数のため、その他様々な方からお手伝い・助言をいただきながら運営しています。</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TextMainTitle title="運営体制" section-id="system" />
        <div class="mt-3 text-body d-flex flex-column ga-2">
          <p>さいとう（全体統括・WEB関連）</p>
          <p>シズ（運営助言・外部連携）</p>
          <p>うどん（実務全般）</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <text-main-title title="スタッフ募集中" />
        <div class="mt-3 text-body d-flex flex-column ga-2">
          <p>DAC東北では、運営にご協力いただけるスタッフを募集しています。<br>興味のある方は、メール・XのDM等でご連絡ください。</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <text-main-title title="過去の開催" />
        <div class="mt-3 text-body d-flex flex-column ga-4">
          <v-row>
            <v-col v-for="edition in archives" :key="edition.key" cols="12" md="6">
              <v-sheet class="pa-5 mx-auto h-100 d-flex flex-column ga-2 border-md rounded-lg">
                <p class="text-subtitle-1 font-weight-bold text-primary mb-0">{{ edition.year }}年開催分</p>
                <p class="text-body-2 text-textSecondary mb-0">
                  {{ edition.dateText }}<br>
                  {{ edition.venue.name }} {{ edition.venue.room }}
                </p>
                <p class="text-body-2 mb-0">
                  全{{ edition.stats.sessionCount }}卓 ／ DM/GM {{ edition.stats.gmCount }}名 ／ 参加プレイヤー {{ edition.stats.playerCount }}名
                </p>
                <v-btn
                  color="primary"
                  variant="outlined"
                  rounded="lg"
                  elevation="0"
                  append-icon="mdi-chevron-right"
                  class="mt-2 align-self-start"
                  :to="edition.sessionsPath"
                >卓一覧を見る</v-btn>
              </v-sheet>
            </v-col>
          </v-row>
          <div>
            <p class="mb-1">DAC東北2025以前の開催は旧サイトからご確認ください</p>
            <a
              href="https://dac.10yearsafter.info/"
              class="text-decoration-none"
              :style="{ color: 'rgb(var(--v-theme-primary))' }"
              target="_blank"
              rel="noopener noreferrer"
            >https://dac.10yearsafter.info/<v-icon size="x-small" icon="mdi-open-in-new" /></a>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { TextMainTitle } from '#components';
import { ARCHIVED_EDITIONS, getEdition } from '~/config/editions'

const archives = ARCHIVED_EDITIONS.map(getEdition)

useSiteMeta({
  title: 'スタッフ紹介と過去の開催情報',
  description: 'DAC東北のスタッフ紹介と運営体制。代表さいとう、副代表シズ、スタッフうどん。スタッフ募集中。DAC東北 2026の開催情報・卓一覧を公開中。2025年以前のイベントは旧サイトを参照。',
  keywords: 'DAC東北,スタッフ,運営,代表,スタッフ募集,過去の開催,開催記録'
})
</script>

<style scoped lang="scss">

</style>
