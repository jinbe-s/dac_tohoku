import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxt/fonts',
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    '@nuxtjs/seo',
    'nuxt-gtag',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify())
      })
    },
  ],
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || ''
  },
  nitro: {
    preset: 'github_pages',
    prerender: {
      crawlLinks: true
    }
  },
  app: {
    baseURL: process.env.NUXT_PUBLIC_BASE || '/',
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${process.env.NUXT_PUBLIC_BASE || '/'}favicon.ico` }
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
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://dac-tohoku.com',
    name: process.env.NUXT_PUBLIC_SITE_NAME || 'DAC東北',
    description: process.env.NUXT_PUBLIC_SITE_DESCRIPTION || '宮城県仙台市で開催する、D20システムを楽しむTRPGコンベンション'
  },
  compatibilityDate: '2025-08-16',
  runtimeConfig: {
    apiBase: process.env.NUXT_API_BASE || '',
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || 'DAC東北',
      siteDescription: process.env.NUXT_PUBLIC_SITE_DESCRIPTION || '宮城県仙台市で開催する、D20システムを楽しむTRPGコンベンション',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://dac-tohoku.com',
      base: process.env.NUXT_PUBLIC_BASE || '/',
      eventData: process.env.NUXT_API_EVENT_DATA || '',
      newInfo: process.env.NUXT_API_NEW_INFO || '',
      sessionList: process.env.NUXT_API_SESSION_LIST || '',
    }
  }
})
