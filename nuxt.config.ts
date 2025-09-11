import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxt/fonts',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    '@nuxtjs/seo',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify())
      })
    },
  ],
  nitro: {
    preset: 'github_pages',
    prerender: {
      crawlLinks: true
    }
  },
  app: {
    baseURL: process.env.NUXT_PUBLIC_BASE || '/',
    head: {
      titleTemplate: '%s | DAC TOHOKU',
      meta: [
        { name: 'description', content: 'サイトの簡単な説明文' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'DAC TOHOKU' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        // { rel: 'canonical', href: 'https://example.com' } // 後で独自ドメイン確定後に設定
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  fonts: {
    provider: 'google',
    defaults: {
      display: 'swap'
    },
    families: [
      { name: 'Inter', weights: [400,600], styles: ['normal'], global: true },
      { name: 'Noto Sans JP', weights: [400,500,700], styles: ['normal'], global: true },
    ]
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/css/base.css'
  ],
  build: { transpile: ['vuetify'] },
  vite: { ssr: { noExternal: ['vuetify'] } },
  site: {
    url: 'https://dac-tohoku.com',        // 独自ドメイン確定後に置き換え
    name: 'DAC TOHOKU',
    description: 'サイトの簡単な説明文'
  },
  compatibilityDate: '2025-08-16',
  runtimeConfig: {
    apiBase: process.env.NUXT_API_BASE || '',
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'DAC TOHOKU',
      siteDescription: process.env.NUXT_PUBLIC_SITE_DESCRIPTION || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://dac-tohoku.com',
      base: process.env.NUXT_PUBLIC_BASE || '/',
      eventData: process.env.NUXT_API_EVENT_DATA || '',
      newInfo: process.env.NUXT_API_NEW_INFO || '',
      sessionList: process.env.NUXT_API_SESSION_LIST || '',
    }
  }
})
