// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    blueprint: md3,
    components,
    directives,
    ssr: true,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            // Brand
            primary: '#1E88E5',
            secondary: '#42A5A5',
            accent: '#F57C00', // Material Design Orange 700 - より濃く、白テキストと十分なコントラスト
            // On Colors (text on colored backgrounds)
            'on-primary': '#FFFFFF',
            'on-secondary': '#FFFFFF',
            'on-accent': '#FFFFFF',
            // Feedback
            success: '#2E7D32',
            warning: '#FB8C00',
            error: '#E53935',
            info: '#0288D1',
            // Surfaces
            background: '#FAFAFA',
            surface: '#FFFFFF',
            // Text / Lines
            textPrimary: '#212121',
            textSecondary: '#616161',
            divider: '#E5E7EB'
          },
        },
        dark: {
          dark: true,
          colors: {
            // Brand
            primary: '#90CAF9',
            secondary: '#B39DDB',
            accent: '#26C6DA',
            // On Colors (text on colored backgrounds)
            'on-primary': '#000000',
            'on-secondary': '#000000',
            'on-accent': '#000000',
            // Feedback
            success: '#66BB6A',
            warning: '#FFA726',
            error: '#EF5350',
            info: '#29B6F6',
            // Surface
            background: '#121212',
            surface: '#1E1E1E',
            // Text/Lines
            textPrimary: '#E5E7EB',
            textSecondary: '#9CA3AF',
            divider: '#2D2D2D'
          },
        },
      },
    }
  })
  nuxtApp.vueApp.use(vuetify)
})
