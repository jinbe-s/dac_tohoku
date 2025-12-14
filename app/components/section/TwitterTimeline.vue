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
import { useTheme } from 'vuetify'

const twRoot = ref<HTMLElement | null>(null)
const isDark = computed(() => useTheme().global.current.value.dark)

// スクリプト読み込み関数
const loadTwitterScript = (): Promise<void> => {
  return new Promise((resolve) => {
    // 既に読み込まれている場合
    if ((window as any).twttr?.widgets) {
      console.log('Twitter widgets already loaded')
      resolve()
      return
    }

    // 既にスクリプトタグが存在する場合はスキップ（重複防止）
    const existingScript = document.querySelector('script[src*="platform.twitter.com/widgets.js"]')
    if (existingScript) {
      console.log('Twitter script already exists, waiting for load...')
      // スクリプトが読み込まれるのを待つ
      const checkInterval = setInterval(() => {
        if ((window as any).twttr?.widgets) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)
      return
    }

    // スクリプトを追加
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'
    script.onload = () => {
      console.log('Twitter widgets script loaded successfully')
      resolve()
    }
    script.onerror = () => {
      console.error('Failed to load Twitter widgets script')
      resolve()
    }
    document.body.appendChild(script)
  })
}

// タイムラインをロード
const loadTwitterTimeline = async () => {
  // スクリプト読み込み完了を待つ
  await loadTwitterScript()

  // スクリプト初期化完了を待つ
  let retryCount = 0
  const maxRetries = 10

  const attemptLoad = () => {
    const twttr = (window as any).twttr

    if (twttr?.widgets && twRoot.value) {
      twttr.widgets.load(twRoot.value)
      console.log('Twitter timeline loaded successfully')
    } else if (retryCount < maxRetries) {
      retryCount++
      console.log(`Retrying Twitter timeline load (${retryCount}/${maxRetries})...`)
      setTimeout(attemptLoad, 300)
    } else {
      console.error('Failed to load Twitter timeline after maximum retries')
    }
  }

  attemptLoad()
}

onMounted(async () => {
  await loadTwitterTimeline()
})
</script>

<style>

</style>
