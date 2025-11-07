<template>
  <v-container class="py-10">
    <div class="d-flex flex-column justify-center ga-3 align-center">
      <p class="font-weight-bold text-h6 text-sm-h5 text-center px-2">
        DAC TOHOKUについての質問・連絡は下記Googleフォーム<br class="d-none d-sm-inline">または公式X(旧Twitter)アカウントのリプライ・DMにてお願いします。
      </p>
      <v-btn
        color="primary"
        rounded="lg"
        elevation="0"
        href="https://forms.gle/k7JC317qwSvJEhf56"
        target="_blank"
        rel="noopener noreferrer"
        :style="{ 'border': '1px solid rgba(255, 255, 255, 0.5)' }"
      >問い合わせフォームへ</v-btn>
      <p>
        <a
          class="text-decoration-none text-primary text-h6"
          href="https://x.com/dac_tohoku"
          target="_blank"
          rel="noopener"
        >公式X(旧Twitter)：@dac_tohoku</a>
      </p>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: 'お問い合わせ',
})
</script>

<style scoped lang="scss">

</style>
