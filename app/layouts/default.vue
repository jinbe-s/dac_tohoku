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
						<span class="font-weight-medium">{{ siteName }}</span>
					</NuxtLink>
				</v-app-bar-title>

				<div class="d-flex align-center justify-space-between">
					<HeaderNavLink
						:items="[
							{ label: 'Home', to: { name: 'index'} },
							{ label: '参加案内', to: { name: 'about' } },
							{ label: '卓一覧', to: { name: 'session' } },
							{ label: '過去の開催', href: 'https://dac.10yearsafter.info/' }
						]"
						gap-class="ml-5"
					/>
				</div>
			</v-container>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
		<v-footer app class="justify-center">
			© {{ new Date().getFullYear() }} {{ siteName }}
		</v-footer>
</v-app>
</template>

<script setup lang="ts">
	import icon from '~/assets/icon.png'

	const { public: pub } = useRuntimeConfig()
	const siteName = computed(() => pub.siteName)
</script>
