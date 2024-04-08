<template>
    <v-container>
        <v-stepper dense v-model="step">
        <v-stepper-header>
            <v-stepper-step :complete="(step > 1)" step="1">
                Identificación             
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="(step > 2)" step="2">
                Validacion
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="(step > 3)" step="3">
                Simulación
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="(step > 4)" step="4">
                Contrato
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="(step > 5)" step="5">
                Registro
            </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <Validacion @success="success" />
            </v-stepper-content>
            <v-stepper-content step="2">
                <Celular @success="success" />
            </v-stepper-content>
            <v-stepper-content step="3">
                <Simulacion @success="success" />
            </v-stepper-content>
            <v-stepper-content step="4">
                <Contrato @success="success" />
            </v-stepper-content>
            <v-stepper-content step="5">
                <Otp @success="success" />
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
    </v-container>
  </template>
<script>
import Simulacion from './components/simulacion.vue';
import Contrato from './components/contrato.vue';
import Otp from './components/otp.vue'
import Validacion from './components/validacion.vue';
import Celular from './components/otpcelular.vue';
export default{
    name: "Home",
    components: { Validacion, Simulacion, Contrato, Otp, Celular },
    data: () => ({
        step: 1,
    }),
    methods: {
        success(step){
            this.step = step;
        }
    }

   
}
</script>
<style>

</style>