import { PHASES, PHASE_ORDER, type PhaseKey, type Range } from '~/config/events'

const toDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s)
  ? new Date(`${s}T00:00:00+09:00`)
  : new Date(s)

const inRange = (t: Date, r: Range) => {
  const a = toDate(r.start).getTime()
  const b = toDate(r.end).getTime()
  return t.getTime() >= a && t.getTime() <= b
}

const useNow = () => {
  const now = ref(new Date())
  if (process.client) {
    const id = setInterval(() => (now.value = new Date()), 60_000)
    onBeforeUnmount(() => clearInterval(id))
  }
  return now
}

export const useEventPhase = () => {
  const now = useNow()

  // 有効判定
  const isEventPhaseActive = computed<PhaseKey[]>(() =>
    PHASE_ORDER.filter(k => {
      return PHASES[k] ? inRange(now.value, PHASES[k]) : false
    })
  )

  // 単体判定
  const isActive = (k: PhaseKey) => computed(() => isEventPhaseActive.value.includes(k))

  // 日時判定
  const activeAt = (d: Date | string) => {
    const t = d instanceof Date ? d : new Date(d)
    return PHASE_ORDER.filter(k => {
      const r = PHASES[k]
      return r ? inRange(t, r) : false
    })
  }

  return { isEventPhaseActive, isActive, activeAt, PHASES, PHASE_ORDER }
}
