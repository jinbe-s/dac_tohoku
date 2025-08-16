<template>
  <v-app>
    <v-app-bar flat color="primary">
			<v-container class="d-flex justify-space-between align-center">
				<div class="d-flex align-center">
					<v-btn :to="{ name: 'index' }">
						<v-icon small>mdi-home</v-icon>
						<v-app-bar-title class="ml-1">{{ siteName }}</v-app-bar-title>
					</v-btn>
				</div>
				<div class="d-flex align-center">
					<!-- <NuxtLink :to="{ name: 'about' }">参加案内</NuxtLink> -->
					<v-btn class="ml-2" :to="{ name: 'about' }" variant="text">参加案内</v-btn>
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
const { public: pub } = useRuntimeConfig()
const siteName = computed(() => pub.siteName)
</script>
