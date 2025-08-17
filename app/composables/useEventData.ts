export type EventDataResponse = {
  date1: string
  date2: string
  venue: string
  link: string
  add1: string
  add2: string
  access_subway: string
  access_taxi: string
}

export const useEventData = () => {
  const { public: pub } = useRuntimeConfig()
  const url = pub.eventData

  const get = () =>
    useFetch<EventDataResponse>(url, {
      method: 'GET',
      server: false,
      timeout: 10_000,
      retry: 1,
      key: 'eventData'
    })

  return { get }
}
