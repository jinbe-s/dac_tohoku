<template>
  <v-sheet
    class="px-5 py-3 mx-auto d-flex flex-column border-md border-primary rounded-lg"
  >
    <ClientOnly>
      <div ref="twRoot">
        <a
          class="twitter-timeline"
          data-lang="ja"
          data-height="300"
          data-chrome="noheader nofooter noborders transparent"
          :data-theme="isDark ? 'dark' : 'light'"
          href="https://twitter.com/dac_tohoku"
        >Tweets by @dac_tohoku</a>
      </div>
    </ClientOnly>
  </v-sheet>
</template>

<script lang="ts" setup>
const twRoot = ref<HTMLElement | null>(null)
import { useTheme } from 'vuetify'
const isDark = computed(() => useTheme().global.current.value.dark)

const loadTwitterTimeline = () => {
  const twttr = (window as any).twttr
  if (twttr?.widgets) {
    twttr.widgets.load(twRoot.value || undefined)
  } else {
    console.warn('Twitter widgets not loaded yet, retrying...')
    // 最大5回リトライ
    let retryCount = 0
    const retryInterval = setInterval(() => {
      retryCount++
      const twttr = (window as any).twttr
      if (twttr?.widgets) {
        twttr.widgets.load(twRoot.value || undefined)
        clearInterval(retryInterval)
      } else if (retryCount >= 5) {
        console.error('Failed to load Twitter widgets after 5 retries')
        clearInterval(retryInterval)
      }
    }, 500)
  }
}

onMounted(() => {
  loadTwitterTimeline()
})
</script>

<style>

</style>
