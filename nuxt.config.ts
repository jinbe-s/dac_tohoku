import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxtjs/robots',
    'nuxt-simple-sitemap',
    '@nuxtjs/seo',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify())
      })
    },
  ],
  // GitHub Pages最適化
  nitro: {
    preset: 'github_pages',            // 404.htmlなどを自動整備
    prerender: {
      crawlLinks: true                 // 内部リンクを辿って自動プリレンダー
      // routes: ['/', '/about']       // 固定的に追加したいルートがあれば指定
    }
  },
  // ★プロジェクトページ（/repo-name/配下）で公開する場合のみ baseURL を '/<REPO>/' に設定
  // 独自ドメインで直配下に出す場合は '/' のままでOK
  app: {
    baseURL: '/',                      // 例: '/my-site/' にするとプロジェクトページ用
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
      ]
    }
  },
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
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
    }
  }
})
