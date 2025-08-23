export type SessionListResponse = {
  table_id: string
  day_1: boolean
  day_2: boolean
  both: boolean
  system_name: string
  system_name_short: string
  system_dm_name: string
  dm_name: string
  session_name: string
  session_lv: string
  session_number: string
  dm_introduce: string
  regulation: string
  overview: string
  session_battle: string
  session_rp: string
  session_gimmick: string
  is_preparation: boolean
  session_beginner: boolean
  system_beginner: boolean
  experience: boolean
  skilled: boolean
  english: string
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
