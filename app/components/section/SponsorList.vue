<template>
  <v-row>
    <template v-for="(sponsor, i) in sponsors" :key="i">
      <v-col cols="12" sm="6" md="4">
        <v-card variant="outlined" class="pa-4 h-100 rounded-lg">
          <v-card-title class="text-body-1 font-weight-bold pa-0 mb-2">
            {{ sponsor.name }}
          </v-card-title>
          <v-card-text class="pa-0 d-flex flex-column ga-1">
            <a
              :href="sponsor.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary text-decoration-none text-body-2"
            >
              <v-icon size="small" icon="mdi-web" class="mr-1" />{{ sponsor.urlLabel || sponsor.name }}
              <v-icon size="x-small" icon="mdi-open-in-new" />
            </a>
            <a
              v-if="sponsor.xUrl"
              :href="sponsor.xUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary text-decoration-none text-body-2"
            >
              <v-icon size="small" class="mr-1">mdi-twitter</v-icon>{{ sponsor.xLabel }}
              <v-icon size="x-small" icon="mdi-open-in-new" />
            </a>
          </v-card-text>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts" setup>
interface Sponsor {
  name: string
  url: string
  urlLabel?: string
  xUrl?: string
  xLabel?: string
}

const sponsors: Sponsor[] = [
  {
    name: '株式会社ホビージャパン',
    url: 'https://hj-trpg.com/',
    xUrl: 'https://x.com/HJ_gamemedia',
    xLabel: '@HJ_gamemedia',
  },
  {
    name: '株式会社ボーンデジタル',
    url: 'https://www.borndigital.co.jp/',
    xUrl: 'https://x.com/bd_publishing',
    xLabel: '@bd_publishing',
  },
  {
    name: 'スタピ堂',
    url: 'https://store.shopping.yahoo.co.jp/sutapido/',
    xUrl: 'https://x.com/sutapido',
    xLabel: '@sutapido',
  },
  {
    name: 'リーチング・ムーン',
    url: 'https://reachingmoon.raku-uru.jp/',
    xUrl: 'https://x.com/TRPGspaceRMoon',
    xLabel: '@TRPGspaceRMoon',
  },
]
</script>
