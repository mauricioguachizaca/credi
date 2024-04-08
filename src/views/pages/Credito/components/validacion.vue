<template>
  <v-from ref="from" v-model="valid" class="mt-5" lazy-validation>
  <v-row >
    <v-col cols="12" sm="12" md="5" xs="12"> <!-- Ajustando el ancho y el largo de la tarjeta en diferentes dispositivos -->
       <!-- Utilizando las clases de Vuetify para el tamaño del texto, el grosor y el color -->
        <v-card-text class="text-h6 font-weight-bold " text-color="black">
          Agrega tus datos para continuar
        </v-card-text>
        <v-card-title class="text-center">Número de cédula</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="cedula"
            :rules="cedulaRules"
            label="ej. 1134567890"
            :counter="10"
            outlined
            single-line
            required
          ></v-text-field>
          <v-card-actions >
          <!-- Deshabilitar el botón si la cédula no es válida o no tiene exactamente 10 dígitos -->
          <v-btn color="success" @click="validarCedula" class="btn-custom mb-2 mr-4 mt-12" :disabled="!cedula || !cedulaRules.every(rule => rule(cedula)) || cedula.length !== 10">Ingresar</v-btn>
        </v-card-actions>
          </v-card-text>
        </v-col>
          <v-col md="7" class="justify-center" style="display: flex;" >
            <v-img max-height="250" class="imgDni" src="@/assets/img/cata.jpg" />
          </v-col>
        </v-row>
        
      
    
 
  </v-from>
</template>

<script>
export default {
  data() {
    return {
      cedula: '',
      cedulaRules: [
        (v) => !!v || 'El número de cédula es requerido',
        (v) => /^[0-9]{10}$/.test(v) || 'El número de cédula debe tener 10 dígitos'
      ]
    }
  },
  methods: {
    validarCedula() {
      // Verificar si la cédula es válida y tiene exactamente 10 dígitos
      if (this.cedulaRules.every(rule => rule(this.cedula)) && this.cedula.length === 10) {
        this.$emit('success', 2);
      }
    }
  }
}
</script>

<style scoped>
/* Estilos adicionales */
.imgDni {
  max-width: 100%;
  margin: auto;
}
</style>
