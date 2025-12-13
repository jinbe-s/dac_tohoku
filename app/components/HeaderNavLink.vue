<!-- app/components/HeaderNavLink.vue -->
<template>
  <div class="d-flex align-center">
    <template v-for="(item, i) in items" :key="i">
      <!-- 内部リンク -->
      <NuxtLink
        v-if="item.to"
        :to="item.to"
        class="nav-link text-decoration-none"
        :class="i > 0 ? gapClass : ''"
      >
        {{ item.label }}
      </NuxtLink>

      <!-- 外部リンク -->
      <a
        v-else-if="item.href"
        :href="item.href"
        class="nav-link text-decoration-none"
        :class="i > 0 ? gapClass : ''"
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
</script>

<style scoped>
.nav-link {
  color: rgb(var(--v-theme-on-primary));
  padding: 8px 12px;
  border-radius: 4px;
  position: relative;
  transition: background-color 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 12px;
  right: 12px;
  height: 3px;
  background-color: rgb(var(--v-theme-accent));
  border-radius: 2px 2px 0 0;
}
</style>
