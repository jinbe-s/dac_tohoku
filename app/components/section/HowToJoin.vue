<template>
  <v-sheet
    class="pa-4 rounded-lg d-flex flex-wrap align-center"
    color="info"
    id="howToJoin"
  >
    <div>
      <p>参加方法</p>
      <p class="text-h5 font-weight-bold my-3" v-text="'Googleフォームから応募'" />
      <div class="pl-2">
        <p v-text="'募集フォームに必要事項を記入'" />
        <p v-text="'自動返信メールで入力内容を確認'" />
        <p v-text="'後日、参加確定後に専用discordに参加'" />
      </div>
    </div>
    <div class="d-flex flex-item align-center ga-4 my-4">
      <UtilPhase>
        <template v-for="k in ['GM1', 'GM2']" :key="i" v-slot:[k]>
          <v-btn
            color="primary"
            rounded="lg"
            elevation="0"
            append-icon="mdi-chevron-right"
            href="https://google.com"
            :style="{ 'border': '1px solid rgba(255, 255, 255, 0.5)' }"
            v-text="'GM応募する'"
          />
        </template>
        <template v-for="k in ['PL1', 'PL2']" :key="i" v-slot:[k]>
          <v-btn
            color="primary"
            rounded="lg"
            elevation="0"
            append-icon="mdi-chevron-right"
            href="https://google.com"
            :style="{ 'border': '1px solid rgba(255, 255, 255, 0.5)' }"
            v-text="'PL応募する'"
          />
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
        v-text="'お問い合わせ'"
      />
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
