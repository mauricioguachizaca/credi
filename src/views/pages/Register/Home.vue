<template>
    <div>
        <v-container>
            <v-stepper dense v-model="step">
                <v-stepper-header>
                    <v-stepper-step :complete="(step > 1)" editable step="1">
                        Identificación
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="(step > 2)" step="2">
                        Validación
                        <small>biométrica</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="(step > 3)" step="3">
                        Simulador
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="(step > 4)" step="4">
                        Datos Laborales
                    </v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content dense step="1">

                        <Identification @success="success" />
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <Face @success="success" />
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <Simulator @success="success" />
                    </v-stepper-content>
                    <v-stepper-content step="4">
                        <Personal @success="success" />
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>

        </v-container>
    </div>

</template>
<script>
import Identification from './components/Identification.vue'
import Face from './components/Face.vue'
import Simulator from './components/Simulator.vue'
import Personal from './components/Personal.vue'
export default {
    name: 'Home',
    components: { Identification, Face, Simulator, Personal },
    data: () => ({
        step: 1,
    }),
    methods: {
        success(step) {
            this.step = step;
        }
    }
}
</script>
<style>

</style>