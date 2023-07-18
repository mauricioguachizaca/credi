<template>
  <v-app>
    <v-app-bar app color="#fff" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain src="@/assets/img/logo.png" transition="scale-transition"
          width="150" />
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
  background-image: url('@/assets/fondo.svg');
  background-size: cover;
  /* background-color: rgb(230, 233, 255); */
  ;
}
</style>