<template>
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
          <span>参加費：1,000円(各日)</span>
        </strong>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { getEventData } = useEventData()
const { data, pending, error } = await getEventData()
</script>

<style scoped>
</style>
