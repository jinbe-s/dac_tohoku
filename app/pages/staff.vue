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
        <div class="mt-3 text-body d-flex flex-column ga-2">
          <p>DAC東北2025以前の開催は旧サイトからご確認ください<br>
            <a
              href="https://dac.10yearsafter.info/"
              class="text-decoration-none"
              :style="{ color: 'rgb(var(--v-theme-primary))' }"
              target="_blank"
              rel="noopener noreferrer"
            >https://dac.10yearsafter.info/<v-icon size="x-small" icon="mdi-open-in-new" /></a></p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { TextMainTitle } from '#components';

useSiteMeta({
  title: 'スタッフ紹介と過去の開催情報',
  description: 'DAC東北のスタッフ紹介と運営体制。代表さいとう、副代表シズ・フェケ。スタッフ募集中。2024年以前のイベントは旧サイトを参照。',
  keywords: 'DAC東北,スタッフ,運営,代表,スタッフ募集,過去の開催'
})
</script>

<style scoped lang="scss">

</style>
