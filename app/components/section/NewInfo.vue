<template>
  <ClientOnly>
    <v-sheet
      class="px-5 py-3 mt-3 mx-auto d-flex flex-column border-md border-primary rounded-lg"
    >
      <div
        v-if="pending"
        class="py-5 d-flex justify-center"
      >
        <v-progress-circular indeterminate />
      </div>

      <v-alert
        v-else-if="error"
        type="error"
        text
      >
        APIの取得に失敗しました: {{ error.message }}
      </v-alert>

      <template
        v-else
        v-for="(item, i) in data" :key="`newInfo-${{i}}`"
      >
        <div
          v-if="item?.display"
          class="infoItem"
        >
          <p class="my-0 font-weight-bold" :style="{ color: 'rgb(var(--v-theme-primary))' }">
            <DateText :value="item?.date" output="yyyy.m.d" />
          </p>
          <p class="mb-0" v-html="sanitized(item?.detail)" />
        </div>
      </template>
    </v-sheet>
    <template #fallback>
      <!-- SSR時に表示 -->
      <v-sheet class="px-5 py-3 mt-3 mx-auto d-flex flex-column ga-3 border-md rounded-lg">
        <v-skeleton-loader type="text" class="mb-2" />
        <v-skeleton-loader type="text" />
      </v-sheet>
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { getNewInfo } = useNewInfo()
const { sanitize } = useHtmlSanitizer()

const { data, pending, error } = await getNewInfo()
const sanitized = (html: string) => sanitize(html)
</script>

<style scoped>
.infoItem + .infoItem {
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px dashed rgb(var(--v-theme-primary));
}
</style>
