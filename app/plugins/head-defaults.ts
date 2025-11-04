// app/plugins/head-defaults.ts
export default defineNuxtPlugin(() => {
  const { public: pub } = useRuntimeConfig()
  const route = useRoute()

  useHead({
    titleTemplate: (title) => title ? `${title} | ${pub.siteName}` : pub.siteName,
  })

  // ページごとのcanonical URLを動的に設定
  useHead(() => ({
    link: [{ rel: 'canonical', href: `${pub.siteUrl}${route.path}` }]
  }))

  useSeoMeta({
    title: pub.siteName,
    description: pub.siteDescription,
    ogTitle: pub.siteName,
    ogDescription: pub.siteDescription,
    ogType: 'website',
    ogUrl: pub.siteUrl,
    ogSiteName: pub.siteName,
    twitterCard: 'summary_large_image'
  })
})
