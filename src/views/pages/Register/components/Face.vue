<template>
  <v-form ref="form" v-model="valid" class="mt-5" lazy-validation>
    <v-dialog v-model="loader" persistent width="100%" content-class="loader">
      <v-row class="justify-center align-center" style="height: 100%;">
        <v-progress-circular :size="70" color="white" :width="5" indeterminate></v-progress-circular>
      </v-row>
    </v-dialog>

    <v-row justify="center" align="center" >
  <v-col cols="11" xs="5" sm="8" md="5" lg="3" xl="4">
    <div class="video-container">
      <video id="video" autoplay></video>
    </div>
  </v-col>
</v-row>
<v-col cols="3" xs="8"  sm="8" md="11" lg="12" xl="12">
<v-row align="center" class="mt-1 justify-center">
  <v-col cols="3">
    <Button text="Iniciar validación biométrica" :click="send" />
  </v-col>
</v-row>
</v-col>
    <v-divider class="mt-10 mb-10"></v-divider>
  </v-form>
</template>

<script>
import Button from '@/components/Button.vue';
import { mdiFaceRecognition } from '@mdi/js';

export default {
  name: 'Face',
  data: () => ({
    face: mdiFaceRecognition,
    loader: false,
    valid: true
  }),
  components: {
    Button
  },
  methods: {
    send() {
      this.$emit('success', 3);
    },
    async startVideo() {
      try {
        const video = document.getElementById('video');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
      } catch (error) {
        console.error('Error al iniciar la cámara:', error);
      }
    }
  },
  watch: {
    loader: {
      handler(val) {
        if (val) {
          setTimeout(() => {
            this.loader = false;
            this.send();
          }, 1000);
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.startVideo();
  },
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Establece la altura del cuerpo al 100% de la altura de la ventana del navegador */
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 100%; /* Crea un espacio en la parte superior del contenedor con la misma altura que su ancho */
  border-radius: 50%; /* Hace que el contenedor sea circular */
  overflow: hidden; /* Oculta cualquier contenido que se desborde del contenedor */
}

.video-container video {
  position: absolute; /* Posiciona el video de forma absoluta dentro de su contenedor */
  top: 0;
  left: 0;
  width: 100%; /* Establece el ancho del video al 100% del contenedor */
  height: 100%; /* Establece la altura del video al 100% del contenedor */
  transform: scaleX(-1); /* Invierte horizontalmente el video */
  object-fit: cover; /* Hace que el video cubra completamente el contenedor */
  border-radius: 50%; /* Hace que el video sea circular */
}
</style>

