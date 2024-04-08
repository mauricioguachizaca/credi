<template>
  <v-container>
   
  <v-col class="text-center">
    <v-btn class="ma-5" color="success" @click="fetchContract">Ver el contrato</v-btn>
  </v-col>
    <v-col v-if="contract" class="text-center">
      <embed :src="pdfUrl" type="application/pdf" width="100%" height="600px" />
      <v-btn class="ma-5" color="success"  @click.prevent="Obteneropt" >Aceptar </v-btn>
    </v-col>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contract: '',
      pdfUrl: ''
    };
  },
  methods: {
    async fetchContract() {
      try {
        const response = await axios.post('http://54.211.53.237:4000/api/credit/getContract', {
          // Aquí puedes incluir cualquier dato adicional que necesites enviar en la petición POST
        });
        // Extraer el campo "contract" de la respuesta
        this.contract = response.data.data.contract;
        // Convertir la cadena base64 en un Blob
        const byteCharacters = atob(this.contract);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        // Crear un enlace para descargar el archivo PDF
        this.pdfUrl = URL.createObjectURL(blob);
      } catch (error) {
        console.error('Error al obtener el contrato:', error);
      }
    },
    Obteneropt() {
      this.$emit('success', 5);
    },
  }
};
</script>
