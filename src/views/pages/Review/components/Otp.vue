<template>
    <v-row align="center" justify="center">
        <v-col lg="4" md="6" sm="6" xs="10" cols="10">
            <v-card class="pa-5">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <div>
                        <div class="ma-auto position-relative" style="max-width: 300px">
                            <h2 class="mt-5 text-center">Ingrese Código de verificación</h2>
                            <br />
                            <v-otp-input v-model="otp" :disabled="loading" @finish="onFinish"></v-otp-input>
                            <v-overlay absolute :value="loading">
                                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                            </v-overlay>
                        </div>
                        <div>
                            Valor: <span class="font-weight-bold">{{ expectedOtp }}</span>
                        </div>
                        <div class="text--caption">Revise su correo electrónico</div>

                        <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000">
                            {{ text }}
                        </v-snackbar>
                    </div>


                </v-form>

            </v-card>
        </v-col>

    </v-row>


</template>
<script>
export default {
    name: 'Identification',
    data: () => ({
        valid: true,
        loading: false,
        snackbar: false,
        snackbarColor: 'default',
        otp: '',
        text: '',
        expectedOtp: '133707',
    }),

    methods: {
        onFinish(rsp) {
            this.loading = true
            setTimeout(() => {
                this.loading = false
                this.snackbarColor = (rsp === this.expectedOtp) ? 'success' : 'warning'
                this.text = `OTP procesado con "${rsp}"`
                // if (rsp === this.expectedOtp) {
                //     setTimeout(() => {
                //         console.log('esto es muy correcto')
                //         // this.loading = true
                //         // this.$emit('success', 3)
                //     }, 1000)
                // }
                this.snackbar = true;

                (rsp == this.expectedOtp) && setTimeout(() => { this.$emit('success', 3) }, 1000)
            }, 3500)
        },
    },
}
</script>
<style scoped>
.position-relative {
    position: relative;
}
</style>