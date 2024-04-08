<template>
  <v-row class="justify-center align-center text-center" style="height: 80vh;">
    <v-col cols="12" sm="9" md="4">
 
    <h3 class="text-h6 mb-2">
      Obtener el OTP
    </h3>
  
    <v-otp-input
      v-model="otp"
      color="primary"
      class="mb-2"
    ></v-otp-input>
  
    <v-col class="d-flex justify-space-around align-center">
    <v-btn
      color="success"
      @click="verificarOTP"
      class="ma-2"
    >
      Verificar OTP
    </v-btn>
    <v-btn
          color="primary"
          @click="redirectToRoute"
          class="ma-2"
        >
          Volver a rellenar
        </v-btn>
      </v-col>
    
    <div v-if="showMessage">
      <p class="text-green">¡Código OTP correcto!</p>
      <p>{{ otpResponse }}</p>
      <v-alert
        v-if="showDocumentMessage"
        type="success"
        dismissible
        @input="showDocumentMessage = false"
      >
        Numero de documento: {{ nDocument }}
        Registro completo con éxito
      </v-alert>
      
    </div>

     
    <p v-if="error" class="text-red">Código OTP incorrecto. Por favor, inténtelo de nuevo.</p>
</v-col>
</v-row>
</template>

<script>
export default {
  data() {
    return {
      otp: '',
      error: false,
      showMessage: false,
      otpResponse: '',
      nDocument: '',  // Agrega nDocument como una propiedad del componente
      showDocumentMessage: false  // Agrega showDocumentMessage como una propiedad del componente
    }
  },
  methods: {
    async verificarOTP() {
      const codigoCorrecto = "151617";
      const cuerpoSolicitud = {
        otp: this.otp
      };

      try {
        const response = await fetch('http://54.211.53.237:4000/api/credit/addCredit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cuerpoSolicitud)
        });

        if (response.ok) {
          const responseData = await response.json();
          
          if (this.otp === codigoCorrecto) {
            // Mostrar mensaje y respuesta OTP
            this.showMessage = true;
            this.otpResponse = responseData.data.otp;
            this.nDocument = responseData.data.nDocument; // Asignar el valor de nDocument
            this.showDocumentMessage = true;  // Mostrar el mensaje del documento
          } else {
            // Mostrar mensaje de error
            this.error = true;
            setTimeout(() => {
              this.error = false; // Desaparecer el mensaje de error después de un tiempo
            }, 5000); // 5000 milisegundos = 5 segundos
          }
        } else {
          console.error('Error en la solicitud:', response.statusText);
          // Mostrar un mensaje de error general
        }
      } catch (error) {
        console.error('Error al obtener el código OTP:', error);
        // Manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      }
    },
    redirectToRoute() {
      this.$emit('success', 1);  // Reemplaza '/ruta' por la ruta a la que quieres redirigir
    }
  }
}
</script>
