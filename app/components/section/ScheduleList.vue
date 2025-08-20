<template>
  <div class="d-flex flex-column ga-1 align-start justify-start">
    <template v-for="(item, i) in items" :key="i">
      <UiScheduleItem
        :name="item.name"
        :title="item.title"
        :text="item.text"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
type ScheduleItemType = { name: string, title: string, text?: string }

const props = withDefaults(defineProps<{
  items: ScheduleItemType[]
}>(), {})
</script>

<style lang="scss" scoped>

</style>
