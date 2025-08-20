<template>
  <div class="d-flex justify-start align-top">
    <v-icon
      :icon="icon"
      small
      color="primary"
    />
    <div class="ml-2">
      <p class="my-0 text-body-2 text-textSecondary font-weight-bold">
        <strong>{{ title }}</strong>
      </p>
      <p class="my-0 pre-line">
        <strong>{{ mainText }}</strong>
      </p>
      <p
        v-if="subText"
        class="my-0 text-body-2 text-textSecondary pre-line"
      >
        {{ subText }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  icon: string
  title: string
  mainText: string
  subText?: string
}>(), { subText: '' })
</script>

<style lang="scss" scoped>
.pre-line {
  white-space: pre-line;
}
</style>
