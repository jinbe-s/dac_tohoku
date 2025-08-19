export type NewInfoResponse = {
  date: string
  detail: string
  display?: string
}

export const useNewInfo = () => {
  const { public: pub } = useRuntimeConfig()
  const url = pub.newInfo

  const getNewInfo = () =>
    useFetch<NewInfoResponse>(url, {
      method: 'GET',
      server: false,
      timeout: 10_000,
      cache: 'no-store',
      headers: { 'cache-control': 'no-cache' },
      retry: 1,
      key: 'newInfo'
    })

  return { getNewInfo }
}
