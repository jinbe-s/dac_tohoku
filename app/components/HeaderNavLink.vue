<template>
  <div class="d-flex align-center">
    <template v-for="(item, i) in items" :key="i">
      <a
        v-if="isExternal(item)"
        :href="item.href"
        class="d-inline-flex align-center text-decoration-none"
        :class="i > 0 ? gapClass : ''"
        :style="{ color: onPrimary }"
        :target="item.target ?? '_blank'"
        :rel="item.rel ?? 'noopener noreferrer'"
      >
        {{ item.label }}
      </a>
      <NuxtLink
        v-else
        :to="item.to"
        class="text-decoration-none"
        :class="i > 0 ? gapClass : ''"
        :style="{ color: onPrimary }"
      >
        {{ item.label }}
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

type InternalItem = { label: string; to: RouteLocationRaw }
type ExternalItem = { label: string; href: string; target?: '_blank' | '_self' | '_parent' | '_top'; rel?: string }
type LinkItem = InternalItem | ExternalItem

const props = withDefaults(defineProps<{
  items: LinkItem[]
  gapClass?: string
}>(), { gapClass: '' })

const isExternal = (item: LinkItem): item is ExternalItem => 'href' in item
const onPrimary = 'rgb(var(--v-theme-on-primary))'
</script>
