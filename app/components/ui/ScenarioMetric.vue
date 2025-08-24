<template>
  <div class="d-flex align-center justify-start ga-3">
    <div class="text-body-2 meter-label">{{ label }}</div>

    <div v-if="variant === 'segment'" class="meter meter--segment" :aria-label="aria">
      <span v-for="i in 5" :key="i" :class="['seg', i <= v ? 'is-on' : '']" />
    </div>

    <div v-else-if="variant === 'dots'" class="meter meter--dots" :aria-label="aria">
      <v-icon v-for="i in 5" :key="i"
        :icon="i <= v ? 'mdi-circle' : 'mdi-circle-outline'"
        size="14" color="primary" class="mx-1" />
    </div>

    <div v-else-if="variant === 'bar'" class="meter meter--bar" :aria-label="aria">
      <v-progress-linear :model-value="v * 20" color="primary" height="8" rounded>
        <template #default>
          <div class="ticks" />
        </template>
      </v-progress-linear>
    </div>

    <div v-else-if="variant === 'radial'" class="meter meter--radial" :aria-label="aria">
      <v-progress-circular :model-value="v * 20" size="36" width="4" color="primary">
        <small>{{ v }}/5</small>
      </v-progress-circular>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  label: string
  value: number | string
  variant?: 'segment' | 'dots' | 'bar' | 'radial'
}>(), { variant: 'segment' })

const v = computed(() => {
  const n = Number(props.value)
  return Number.isFinite(n) ? Math.min(5, Math.max(1, Math.round(n))) : 1
})
const aria = computed(() => `${props.label}: ${v.value}/5`)
</script>

<style scoped>
.meter-label {
  min-width: 70px;
}
.meter--segment {
  display: grid;
  grid-template-columns: repeat(5, 16px);
  gap: 6px;
}
.meter--segment .seg {
  height: 8px;
  border-radius: 9999px;
  background: rgb(var(--v-theme-surface-variant));
}
.meter--segment .seg.is-on {
  background: rgb(var(--v-theme-primary));
}

.meter--bar :deep(.v-progress-linear) {
  position:relative;
  min-width:140px;
}
.meter--bar .ticks {
  position:absolute;
  inset:0;
  pointer-events:none;
  border-radius:inherit;
  background-image: repeating-linear-gradient(
    to right,
    transparent 0,
    transparent calc((100%/5) - 1px),
    rgba(0,0,0,.12) calc((100%/5) - 1px),
    rgba(0,0,0,.12) calc(100%/5)
  );
  mix-blend-mode: multiply;
}
</style>
