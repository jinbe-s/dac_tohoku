<template>
  <v-sheet
    class="pa-4 rounded-lg d-flex flex-wrap align-center"
    color="info"
    id="howToJoin"
  >
    <div>
      <p>参加方法</p>
      <p class="text-h5 font-weight-bold my-3">Googleフォームから応募</p>
      <div class="pl-2">
        <p>募集フォームに必要事項を記入</p>
        <p>自動返信メールで入力内容を確認</p>
        <p>後日、参加確定後に専用discordに参加</p>
      </div>
    </div>
    <div class="d-flex flex-item align-center ga-4 my-4">
      <UtilPhase>
        <template #GM1 #GM2>
          <v-btn
            color="primary"
            rounded="lg"
            elevation="0"
            append-icon="mdi-chevron-right"
            href="https://google.com"
            :style="{ 'border': '1px solid rgba(255, 255, 255, 0.5)' }"
          >GM応募する</v-btn>
        </template>
        <template #PL1 #PL2>
          <v-btn
            color="primary"
            rounded="lg"
            elevation="0"
            append-icon="mdi-chevron-right"
            href="https://google.com"
            :style="{ 'border': '1px solid rgba(255, 255, 255, 0.5)' }"
          >PL応募する</v-btn>
        </template>
      </UtilPhase>
      <v-btn
        color="primary"
        variant="outlined"
        rounded="lg"
        elevation="0"
        append-icon="mdi-email-outline"
        :to="{ hash: '#schedule' }"
        :style="{ '--v-activated-opacity': 0, 'background': '#fff' }"
      >お問い合わせ</v-btn>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.flex-wrap {
  justify-content: space-between;

  @media (max-width: 959px) {
    justify-content: center;
    flex-direction: column;
  }
}

.flex-item {
  justify-content: center;

  @media (max-width: 959px) {
    flex-direction: column;
  }
}
</style>
