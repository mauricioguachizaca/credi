<template>
  <div>
    <v-row justify="center">
      <v-col rows="2" class="mt-10 " md="6" sm="5" cols="10" xs="10">
        <v-img class="img_pincipal" alt="hola avatar" :src="homeImage" />
        <h2 class="mt-5 initial">¡ EMPECEMOS ! <br />
          RECUERDA TENER LISTO:
        </h2>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="6" sm="12" xs="10" cols="10">
        <v-row>
          <v-col md="6" sm="12" xs="12" v-for="(item, index) in arrayTargets" :key="index">
            <v-card sm=" 12" xs="6" style="border-color: #5D6FFF;" outlined>
              <v-list-item three-line>
                <v-list-item-avatar tile size="80">
                  <v-img :alt="item.title" :src="item.img" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="text-h7">
                    <b>{{ item.title }}</b>
                  </v-list-item-title>
                  <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>

      </v-col>


    </v-row>

    <v-row justify="center">
      <v-col md="3" xs="10" cols="10">
        <v-btn width="100%" :loading="loading3" :disabled="loading3" color="primary" @click="loader1 = 'loading3'">
          <v-icon left>
            mdi-eye-refresh-outline
          </v-icon>
          Revisar Mi Solicitud
          <template v-slot:loader1>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
            Verificando Permisos..
          </template>
        </v-btn>
      </v-col>
      <v-col md="3" xs="10" cols="10">
        <v-btn width="100%" :loading="loading4" :disabled="loading4" color="primary" @click="loader = 'loading4'">
          <v-icon left>
            mdi-pencil
          </v-icon>
          Iniciar Solicitud de Crédito
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
            Verificando Permisos..
          </template>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mdiAccount } from '@mdi/js'
import { mdiCardAccountDetailsOutline } from '@mdi/js';
import homeImg from '@/assets/img/home.jpg'
import dniImg from '@/assets/img/card.png'
import netImg from '@/assets/img/freelance.png'
import camImg from '@/assets/img/web-cam.png'
import mapImg from '@/assets/img/map.png'
export default {
  name: 'Home',
  data: () => ({
    loader: null,
    loader1: null,
    loading3: false,
    loading4: false,
    homeImage: homeImg,
    arrayTargets: [
      {
        title: 'CÉDULA ACTUALIZADA',
        subtitle: 'Código Dactilar',
        img: dniImg
      },
      {
        title: 'NAVEGADOR COMPATIBLE',
        subtitle: 'Chrome, Safari, Edge',
        img: netImg
      },
      {
        title: 'UBICACIÓN GPS ACTIVA',
        subtitle: 'Permitir acceso',
        img: mapImg
      },
      {
        title: 'CAMARA WEB',
        subtitle: 'Permitir acceso',
        img: camImg
      },
    ],
    icons: {
      mdiCardAccountDetailsOutline,
      mdiAccount
    }
  }),
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false, this.$router.push('/registro')), 3000)

      this.loader = null
    },
    loader1() {
      const l = this.loader1
      this[l] = !this[l]

      setTimeout(() => (this[l] = false, this.$router.push('/revision')), 3000)

      this.loader1 = null
    },
  },
}
</script>
<style>
.initial {
  text-align: center;
}

.img_pincipal {
  border-radius: 10px;
  border: solid;
  border-color: #5D6FFF;
  border-width: 1px;
  max-height: 250px;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>