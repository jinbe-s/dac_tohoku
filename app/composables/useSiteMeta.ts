export const useSiteMeta = (opts?: {
  title?: string
  description?: string
}) => {
  const { public: pub } = useRuntimeConfig()

  const fullTitle = opts?.title
    ? `${opts.title} | ${pub.siteName}`
    : pub.siteName

  const description = opts?.description || pub.siteDescription
  const url = pub.siteUrl

  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} | ${pub.siteName}` : pub.siteName
    },
    link: [
      { rel: 'canonical', href: url }
    ]
  })

  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: 'website',
    ogUrl: url,
    twitterCard: 'summary_large_image'
  })
}
