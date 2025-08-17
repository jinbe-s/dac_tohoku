<template>
  <component :is="tag">{{ display }}</component>
</template>

<script setup lang="ts">
import dateFormat from 'dateformat'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: string | number | Date | undefined | null
  output?: string
  fallback?: string // 置き換え
  tag?: string
  jst?: boolean
}>(), {
  output: 'yyyy年m月d日',
  fallback: '',
  tag: 'span',
  jst: true
})

function parseToDate(input: string | number | Date | null | undefined): Date | null {
  if (input == null || input === '') return null
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input
  if (typeof input === 'number') {
    const d = new Date(input); return isNaN(d.getTime()) ? null : d
  }
  const s = String(input).trim()
  if (/^\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?(?:Z|[+\-]\d{2}:\d{2})?)?$/.test(s)) {
    const d = new Date(s)
    return isNaN(d.getTime()) ? null : d
  }
  let m = s.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/)
  if (m) return makeUtc(Number(m[1]), Number(m[2]), Number(m[3]))
  m = s.match(/^(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/i)
  if (m) return makeUtc(Number(m[1]), Number(m[2]), Number(m[3]))
  return null
}

function makeUtc(y: number, mo: number, d: number): Date | null {
  if (mo < 1 || mo > 12) return null
  const dt = new Date(Date.UTC(y, mo - 1, d))
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null
  return dt
}

function formatJst(dt: Date, mask: string, jst: boolean): string {
  if (jst) {
    const jstShifted = new Date(dt.getTime() + 9 * 60 * 60 * 1000)
    return dateFormat(jstShifted, 'UTC:' + mask)
  }
  return dateFormat(dt, mask)
}

const display = computed(() => {
  const dt = parseToDate(props.value)
  return dt ? formatJst(dt, props.output, props.jst) : props.fallback
})
</script>
