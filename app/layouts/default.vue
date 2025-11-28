<template>
  <v-app>
    <v-app-bar flat color="primary">
			<v-container class="d-flex justify-space-between align-center">
				<v-app-bar-title class="d-flex align-center">
					<NuxtLink
						class="d-flex align-center text-decoration-none"
						:to="{ name: 'index' }"
						:style="{ color: 'rgb(var(--v-theme-on-primary))' }"
					>
						<v-img :src="icon" :width="40" :height="40" contain class="shrink-0 mr-2" />
						<span class="font-weight-medium text-truncate">{{ siteName }}</span>
					</NuxtLink>
				</v-app-bar-title>

				<!-- デスクトップメニュー -->
				<div class="d-none d-md-flex align-center justify-space-between">
					<HeaderNavLink
						:items="navItems"
						gap-class="ml-5"
					/>
				</div>

				<!-- モバイルハンバーガーメニュー -->
				<v-app-bar-nav-icon
					class="d-md-none"
					@click="drawer = !drawer"
					color="on-primary"
				/>
			</v-container>
    </v-app-bar>

		<!-- ナビゲーションドロワー（モバイル用） -->
		<v-navigation-drawer
			v-model="drawer"
			temporary
			location="right"
		>
			<v-list nav>
				<template v-for="(item, i) in navItems" :key="i">
					<!-- 内部リンク -->
					<v-list-item
						v-if="item.to"
						:to="item.to"
						:title="item.label"
						@click="drawer = false"
					/>
					<!-- 外部リンク -->
					<v-list-item
						v-else-if="item.href"
						:href="item.href"
						:title="item.label"
						target="_blank"
						rel="noopener noreferrer"
						@click="drawer = false"
					/>
				</template>
			</v-list>
		</v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
		<v-footer app class="justify-center">
			<small>© {{ new Date().getFullYear() }} {{ siteName }}</small>
		</v-footer>
</v-app>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import icon from '~/assets/icon.png'

const { public: pub } = useRuntimeConfig()
const siteName = computed(() => pub.siteName)
const drawer = ref(false)

// SSOT: ナビゲーションメニューの定義（単一の情報源）
const navItems = [
	{ label: 'Home', to: { name: 'index' } },
	{ label: '参加案内', to: { name: 'about' } },
	{ label: '卓一覧', to: { name: 'session' } },
	{ label: 'お問い合わせ', to: { name: 'contact' } },
	{ label: '過去の開催', href: 'https://dac.10yearsafter.info/' }
] as Array<{ label: string; to?: RouteLocationRaw; href?: string }>

const config = useRuntimeConfig()
useHead({
	link: [
		{ rel: 'icon', type: 'image/x-icon', href: `${config.public.base}favicon.ico` }
	]
})
</script>
