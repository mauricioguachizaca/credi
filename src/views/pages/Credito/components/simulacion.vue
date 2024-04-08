<template>
  <v-container fluid>
    <!-- Encabezado del simulador -->
    <v-row align="center" justify="center" class="ma-1">
      <v-col cols="12" class="text-h3 justify-center d-flex pa-2 font-weight-bold">
        Simulador de crédito
      </v-col>
      <v-col cols="12" class="text-h5 pa-2 font-weight-bold">
        Datos del crédito
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <!-- Campos del formulario -->
    <v-row class="d-flex justify-space-around mb-6">
      <!-- Campo de monto -->
      <v-col cols="12" md="3" class="mt-10">
        <p class="ml-9">Cuánto dinero necesita</p>
        <v-text-field
          ref="monto"
          single-line
          dense
          outlined
          label="ej. 10000"
          v-model="minAmount"
          suffix="$"
          :rules="dineroRules"
        >
          <v-icon slot="prepend" color="primary">mdi-cash-multiple</v-icon>
        </v-text-field>
      </v-col>
      <!-- Campo de tiempo -->
      <v-col cols="12" md="3" class="mt-10">
        <p class="ml-9">Por cuántos meses necesita</p>
        <v-text-field
          ref="meses"
          single-line
          dense
          outlined
          label="ej. 24"
          v-model="minMonths"
          suffix="Meses"
          :rules="mesesRules"
        >
          <v-icon slot="prepend" color="primary">mdi-calendar-month</v-icon>
        </v-text-field>
      </v-col>
      <!-- Campo de día de débito -->
      <v-col cols="12" md="3" class="mt-10">
        <p class="ml-9">Día de débito</p>
        <v-text-field
          ref="diaDebito"
          dense
          single-line
          outlined
          label="ej. 10"
          v-model="minDayDebit"
          suffix="Días"
          :rules="diasRules"
        >
          <v-icon slot="prepend" color="primary">mdi-calendar-month</v-icon>
        </v-text-field>
      </v-col>
      <!-- Selección de cuota -->
      <v-col cols="12" class="text-center justify-center d-flex mt-4">
        <v-radio-group v-model="cuotaSeleccionada" row>
          <v-radio v-for="(cuota, index) in cuotas" :key="index" :label="cuota" :value="cuota"></v-radio>
        </v-radio-group>
      </v-col>
      <!-- Botón de cálculo -->
      <v-col cols="12" class="text-center">
        <v-btn color="success" @click.prevent="enviarSeleccion">Calcular mi cuota</v-btn>
      </v-col>
    </v-row>
    <!-- Visualización de resultados -->
    <v-row>
      <v-col class="text-center">
        <v-data-table v-if="mostrarTabla" :headers="tableHeaders" :items="respuestaTabla" item-key="period" dense :rounded="true"></v-data-table>
        <v-btn v-if="mostrarTabla" color="success" @click.prevent="redireccionarContrato" class="ma-4">Aceptar</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cuotas: [],
      cuotaSeleccionada: null,
      minAmount: 0,
      minMonths: 0,
      minDayDebit: 0,
      mostrarTabla: false,
      respuestaTabla: [],
      tableHeaders: [
        { text: 'Período', value: 'period' },
        { text: 'Interés', value: 'interest' },
        { text: 'Capital', value: 'capital' },
        { text: 'Balance', value: 'balance' },
        { text: 'Seguro', value: 'insurance' },
        { text: 'Cuota Total', value: 'quotaTotal' }
      ],
      dineroRules: [
        v => !!v || 'Campo requerido',
        v => /^[0-9]+$/.test(v) || 'Ingrese solo números',
        v => (v >= 2000 && v <= 100000) || 'Ingrese un valor entre 2000 y 100,000'
      ],
      mesesRules: [
        v => !!v || 'Campo requerido',
        v => /^[0-9]+$/.test(v) || 'Ingrese solo números',
        v => (v >= 12 && v <= 84) || 'Ingrese un valor entre 12 y 84'
      ],
      diasRules: [
        v => !!v || 'Campo requerido',
        v => /^[0-9]+$/.test(v) || 'Ingrese solo números',
        v => (v >= 1 && v <= 25) || 'Ingrese un valor entre 1 y 25'
      ]
    };
  },
  methods: {
    async enviarSeleccion() {
      try {
        if (this.$refs.monto.validate() && this.$refs.meses.validate() && this.$refs.diaDebito.validate()) {
          if (this.cuotaSeleccionada && this.minAmount && this.minMonths && this.minDayDebit) {
            const cuerpoSolicitud = {
              quota: this.cuotaSeleccionada,
              amount: this.minAmount,
              term: this.minMonths
            };
            const response = await fetch('http://54.211.53.237:4000/api/credit/simulate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(cuerpoSolicitud)
            });
            const data = await response.json();
            this.respuestaTabla = data.data.amortization;
            this.mostrarTabla = true;
          } else {
            throw new Error("Por favor ingrese todos los datos para calcular la cuota.");
          }
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Error al enviar la solicitud: ' + error.message);
      }
    },
    redireccionarContrato() {
      this.$emit('success', 4);
    },
  },
  created() {
    const respuesta_post = {
      "success": true,
      "data": {
        "amount": {
          "minAmount": "",
          "maxAmount": 100000,
          "minMonths": "",
          "maxMonths": 84,
          "minDayDebit": "",
          "maxDayDebit": 25
        },
        "quotas": [
          {
            "id": 1,
            "description": "CUOTA FIJA",
          },
          {
            "id": 2,
            "description": "CUOTA VARIABLE",
          }
        ]
      },
      "message": ""
    };

    this.cuotas = respuesta_post.data.quotas.map(cuota => cuota.description);
    this.minAmount = respuesta_post.data.amount.minAmount;
    this.minMonths = respuesta_post.data.amount.minMonths;
    this.minDayDebit = respuesta_post.data.amount.minDayDebit;
  }
};
</script>

<style scoped>
/* Estilos específicos para este componente si es necesario */
.comment {
  font-style: italic;
  color: #888;
}
</style>
