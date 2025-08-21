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

onMounted(() => {
  (window as any)?.twttr?.widgets?.load?.(twRoot.value || undefined)
})
</script>

<style>

</style>
