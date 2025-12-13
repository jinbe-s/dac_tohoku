<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12">
        <TextMainTitle title="スタッフ一覧" section-id="staffList" />
        <div class="mt-3 text-body d-flex flex-column ga-2">
          <p>代表：さいとう</p>
          <p>副代表：しず</p>
          <p>全般補助：フェケ</p>
          <p>WEB制作：さいとう</p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TextMainTitle title="運営体制" section-id="system" />
        <div class="mt-3 text-body d-flex flex-column ga-2">
          <p>現在作成中...</p>
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
          <p>2024年以前の開催は旧サイトからご確認ください<br>
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

useSeoMeta({
  title: 'スタッフ/過去の開催',
})
</script>

<style scoped lang="scss">

</style>
