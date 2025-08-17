<template>
  <ClientOnly>
    <div class="my-5">
      <div v-if="pending" class="py-5 d-flex justify-center">
        <v-progress-circular indeterminate />
      </div>

      <v-alert v-else-if="error" type="error" text>
        APIの取得に失敗しました: {{ error.message }}
      </v-alert>

      <div v-else class="d-flex flex-column ga-2 text-h5 text-center">
        <h1 class="text-h4">
          <strong>DAC TOHOKU 2026</strong>
        </h1>
        <div>
          <strong>
            <DateText :value="data?.date1" output="yyyy.m.d(ddd)" />・<DateText :value="data?.date2" output="yyyy.m.d(ddd)" />
          </strong>
        </div>
        <div>
          <strong>
            <span v-if="data?.venue">会場：{{ data?.venue }}</span>
            <span v-if="data?.link">
              (<a
                :href="data!.link"
                :style="{ color: 'rgb(var(--v-theme-primary))' }"
                class="text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >アクセス</a>)
            </span>
          </strong>
        </div>
        <div>
          <strong>
            <span>参加費(各日)：一般 1,000円、学生 500円(要学生証)</span><br />
          </strong>
        </div>
      </div>
    </div>
    <template #fallback>
      <!-- SSR時に表示 -->
      <div class="my-5">
        <v-skeleton-loader type="text" class="mb-2" />
        <v-skeleton-loader type="text" />
      </div>
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { getEventData } = useEventData()
const { data, pending, error } = await getEventData()
</script>

<style scoped>
</style>
