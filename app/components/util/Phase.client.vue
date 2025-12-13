<template>
  <template v-for="k in toShow" :key="k">
    <component v-if="map && map[k]" :is="map[k]" />
    <slot v-else :name="k" />
  </template>
  <component v-if="toShow.length === 0 && fallback" :is="fallback" />
</template>

<script setup lang="ts">
import type { PhaseKey } from '~/config/events'
import { useEventPhase } from '~/composables/useEventPhase'

const props = withDefaults(defineProps<{
  map?: Partial<Record<PhaseKey, any>>
  fallback?: any
  once?: boolean // trueの場合、複数フェーズがアクティブでも最初の1つだけ表示
}>(), {
  once: false
})

const { isEventPhaseActive, PHASE_ORDER } = useEventPhase()

const toShow = computed(() => {
  const activePhases = PHASE_ORDER.filter(k => isEventPhaseActive.value.includes(k) && ((props.map && props.map[k]) || true))

  // onceが有効な場合は最初の1つだけ返す
  if (props.once && activePhases.length > 0) {
    return [activePhases[0]]
  }

  return activePhases
})
</script>
