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
}>(), {})

const { isEventPhaseActive, PHASE_ORDER } = useEventPhase()

const toShow = computed(() => {
  return PHASE_ORDER.filter(k => isEventPhaseActive.value.includes(k) && ((props.map && props.map[k]) || true))
})
</script>
