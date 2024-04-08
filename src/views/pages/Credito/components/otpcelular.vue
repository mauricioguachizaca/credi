<template>
    <v-form ref="form" v-model="valid" lazy-validation>
    <v-row class="justify-center align-center text-center" style="height: 80vh;" >
        <v-col lg="4" md="8" sm="6" xs="10" cols="100%">           
                    <div>
                        <div class="ma-auto position-relative" style="max-width: 1200px">
                            <h2 >Ingrese Código de verificación</h2>
                            <br />
                            <v-otp-input class="mb-2" v-model="otp" :disabled="loading" @finish="onFinish"></v-otp-input>
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
        </v-col>
    </v-row>
</v-form>
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