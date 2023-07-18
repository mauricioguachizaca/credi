<template>
    <v-form ref="form" v-model="valid" class="mt-5" lazy-validation>
        <v-row justify="center">
            <v-col lg="5" md="5" sm="12" xs="12">
                <v-row>
                    <v-col lg="12" md="12" sm="12" xs="12" cols="12">
                        <v-text-field label="Define el monto $" dense outlined v-model="monto"
                            hint="Puedes solicitar hasta $4000" style="text-align: center;" :rules="numberRule"
                            persistent-hint required>
                            <v-icon slot="prepend" color="primary">
                                mdi-cash-multiple
                            </v-icon>
                        </v-text-field>
                        <v-alert class="ml-8" outlined dense type="info" color="secondary">

                            La aprobación depende de tus <strong>ingresos</strong>
                        </v-alert>
                        <v-select dense v-model="meses" :rules="requiredRule" :items="items" outlined attach
                            label="Elije el plazo en Meses">
                            <v-icon slot="prepend" color="primary">
                                mdi-calendar-month
                            </v-icon></v-select>
                        <v-btn :loading="loading" :disabled="loading" color="secondary" class="ml-8 white--text"
                            @click="loader = 'loading'">
                            <v-icon left dark>
                                mdi-signal
                            </v-icon>
                            Simular
                        </v-btn>
                    </v-col>
                    <v-col lg="6" md="6" sm="12" xs="12" cols="12">
                        <v-text-field dense outlined v-model="meses" disabled :rules="numberRule" label="CUOTA/MESES">
                            <v-icon slot="prepend" color="primary">
                                mdi-calendar-month
                            </v-icon>
                        </v-text-field>
                        <v-text-field dense outlined v-model="cuota" :rules="numberRule" label="TASA DE INTERÉS">
                            <v-icon slot="prepend" color="primary">
                                mdi-currency-usd
                            </v-icon>
                        </v-text-field>
                    </v-col>
                    <v-col lg="6" md="6" sm="12" xs="12" cols="12">
                        <v-text-field dense outlined v-model="cuota" :rules="numberRule" label="CUOTA ESTIMADA">
                            <v-icon slot="prepend" color="primary">
                                mdi-currency-usd
                            </v-icon>
                        </v-text-field>
                        <v-text-field dense outlined :value="cuota" label="TOTAL A PAGAR" disabled>
                            <v-icon slot="prepend" color="primary">
                                mdi-currency-usd
                            </v-icon>
                        </v-text-field>
                    </v-col>
                </v-row>

            </v-col>
        </v-row>
        <v-btn :disabled="!simulated" color="success" class="mr-4" @click="send">
            Continuar
        </v-btn>
    </v-form>
</template>
<script>
export default {
    name: 'Simulator',
    data: () => ({
        simulated: false,
        loader: null,
        loading: false,
        valid: true,
        monto: '',
        cuota: '$ 0.00',
        meses: '',
        items: ['6 meses', '12 meses', '24 meses', '48 meses'],
        requiredRule: [
            v => !!v || 'Campo requerido',
        ],
        numberRule: [
            v => !!v.replace(/[^0-9.]/g, '') || 'Campo solo puede contener números',
            v => !!v || 'Campo requerido',

        ],
    }),
    watch: {
        loader() {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false, this.calculate()), 500)

            this.loader = null
        },
    },

    methods: {
        send() {
            this.$emit('success', 4)
        },
        calculate() {
            if (this.$refs.form.validate()) {
                // this.cuota = (parseFloat(this.monto) / parseFloat(this.meses)).toFixed(2);
                this.cuota = '15.00'
                this.simulated = true
            }
        },
    },
}
</script>
<style scoped>
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