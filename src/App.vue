<template>
	<v-app>
		<v-app-bar app color="#ffffff" dark>
			<div class="d-flex align-center">
				<v-img alt="Vuetify Logo" class="shrink mr-2" contain src="@/assets/img/logo.png"
					transition="scale-transition" width="150" @click="$router.push('/inicio')" style="cursor: pointer;"/>
			</div>

			<v-spacer></v-spacer>
			<!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        X
      </v-btn> -->
		</v-app-bar>

		<v-main class="background">
			<router-view />
		</v-main>
	</v-app>
</template>

<script>

export default {
	name: 'App',

	data: () => ({
		//
	}),
};
</script>

<style>
.background {
	/* background-image: url('@/assets/fondo.svg'); */
	background-size: cover;
	background-color: '#f5f6f7';
	;
}
</style>