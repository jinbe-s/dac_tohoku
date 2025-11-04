export const useSiteMeta = (opts?: {
  title?: string
  description?: string
}) => {
  const { public: pub } = useRuntimeConfig()
  const route = useRoute()

  const fullTitle = opts?.title
    ? `${opts.title} | ${pub.siteName}`
    : pub.siteName

  const description = opts?.description || pub.siteDescription
  const pageUrl = `${pub.siteUrl}${route.path}`

  // ページ固有のメタ情報を上書き
  useHead({
    link: [
      { rel: 'canonical', href: pageUrl }
    ]
  })

  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: 'website',
    ogUrl: pageUrl,
    ogSiteName: pub.siteName,
    twitterCard: 'summary_large_image'
  })
}
