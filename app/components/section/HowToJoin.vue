<template>
  <v-sheet
    class="pa-4 rounded-lg d-flex flex-column align-start"
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
    <div class="mt-4">
      <UtilPhase>
        <template v-for="k in ['GM1', 'GM2']" :key="k" v-slot:[k]>
          <p class="text-body-1">
            詳しくは
            <NuxtLink to="/about#dmRecruit" class="font-weight-bold text-decoration-underline">GM応募案内ページ</NuxtLink>
            をご覧ください
          </p>
        </template>
        <template v-for="k in ['PL1', 'PL2']" :key="k" v-slot:[k]>
          <p class="text-body-1">
            詳しくは
            <NuxtLink to="/about#plRecruit" class="font-weight-bold text-decoration-underline">PL応募案内ページ</NuxtLink>
            をご覧ください
          </p>
        </template>
      </UtilPhase>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
</script>
