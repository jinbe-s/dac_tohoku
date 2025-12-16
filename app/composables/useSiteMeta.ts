export const useSiteMeta = (opts?: {
  title?: string
  description?: string
  ogImage?: string
  keywords?: string
}) => {
  const { public: pub } = useRuntimeConfig()
  const route = useRoute()

  const fullTitle = opts?.title
    ? `${opts.title} | ${pub.siteName}`
    : pub.siteName

  const description = opts?.description || pub.siteDescription
  const pageUrl = `${pub.siteUrl}${route.path}`
  const ogImage = opts?.ogImage || `${pub.siteUrl}/og-image.png`

  // ページ固有のメタ情報を上書き
  useHead({
    link: [
      { rel: 'canonical', href: pageUrl }
    ]
  })

  useSeoMeta({
    title: fullTitle,
    description,
    keywords: opts?.keywords,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: 'website',
    ogUrl: pageUrl,
    ogSiteName: pub.siteName,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterSite: '@dac_tohoku',
    twitterCreator: '@dac_tohoku',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: ogImage
  })
}
