export type SessionListResponse = {
  table_id: string
  day_1: number
  day_2: number
  both: number
  system_name: string
  system_name_short: string
  system_dm_name: string
  dm_name: string
  session_name: string
  session_lv: string
  session_number: string
  dm_introduce: string
  dm_experience: string
  regulation: string
  overview: string
  session_battle: string
  session_rp: string
  session_gimmick: string
  session_others: {
    name: string[]
    point: string[]
  }
  is_preparation: number
  session_beginner: number
  system_beginner: number
  experience: number
  skilled: number
  english: string
  players?: string[]
}

export const useSessionList = () => {
  const { public: pub } = useRuntimeConfig()
  const url = pub.sessionList

  const getSessionList = () =>
    useFetch<SessionListResponse>(url, {
      method: 'GET',
      server: false,
      default: () => [] as SessionListResponse[],
      timeout: 10_000,
      cache: 'no-store',
      headers: { 'cache-control': 'no-cache' },
      retry: 1,
      key: 'sessionList'
    })

  return { getSessionList }
}
