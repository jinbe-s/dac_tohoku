<!-- app/components/HeaderNavLink.vue -->
<template>
  <div class="d-flex align-center">
    <template v-for="(item, i) in items" :key="i">
      <!-- 内部リンク -->
      <NuxtLink
        v-if="item.to"
        :to="item.to"
        class="text-decoration-none"
        :class="i > 0 ? gapClass : ''"
        :style="{ color: onPrimary }"
      >
        {{ item.label }}
      </NuxtLink>

      <!-- 外部リンク -->
      <a
        v-else-if="item.href"
        :href="item.href"
        class="text-decoration-none"
        :class="i > 0 ? gapClass : ''"
        :style="{ color: onPrimary }"
        target="_blank"
        rel="noopener"
      >
        {{ item.label }}
      </a>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(defineProps<{
  items: Array<{ label: string; to?: RouteLocationRaw; href?: string }>
  gapClass?: string
}>(), { gapClass: '' })

const onPrimary = 'rgb(var(--v-theme-on-primary))'
</script>
