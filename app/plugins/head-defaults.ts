// app/plugins/head-defaults.ts
export default defineNuxtPlugin(() => {
  const { public: pub } = useRuntimeConfig()

  useHead({
    titleTemplate: (title) => title ? `${title} | ${pub.siteName}` : pub.siteName,
    link: [{ rel: 'canonical', href: pub.siteUrl }]
  })

  useSeoMeta({
    title: pub.siteName,
    description: pub.siteDescription,
    ogTitle: pub.siteName,
    ogDescription: pub.siteDescription,
    ogType: 'website',
    ogUrl: pub.siteUrl,
    twitterCard: 'summary_large_image'
  })
})
