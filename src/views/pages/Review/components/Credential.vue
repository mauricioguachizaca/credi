<template>
    <v-row align="center" justify="center">
        <v-col lg="3" md="6" sm="6" xs="10" cols="10">
            <v-card class="pa-5">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row class="mx-auto" justify="center">
                        <v-col>
                            <h2 class="mt-5 text-center">Información Personal</h2>
                            <br />
                            <v-text-field dense outlined v-model="email" :rules="emailRules" label="Correo electrónico"
                                required></v-text-field>
                            <v-text-field dense outlined v-model="name2" :counter="10" :rules="requiredRule"
                                label="Cédula" required></v-text-field>
                            <v-text-field dense outlined v-model="code" :counter="6" :rules="requiredRule"
                                label="Código dactilar" required></v-text-field>
                        </v-col>
                    </v-row>
                    <div class="text-center">
                        <v-btn class="mx-auto" :disabled="!valid" color="success" @click="validate">
                            Continuar
                        </v-btn>
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
        name2: '',
        code: '',
        requiredRule: [
            v => !!v || 'Campo requerido',
        ],
        email: '',
        emailRules: [
            v => !!v || 'Correo es requerido',
            v => /.+@.+\..+/.test(v) || 'Correo no válido',
        ],
        select: null,
        items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
        ],
        checkbox: false,
    }),

    methods: {
        validate() {
            console.log('entramos a validar ')
            this.$refs.form.validate() && this.$emit('success', 2)
        },
        reset() {
            this.$refs.form.reset()
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        },
    },
}
</script>
<style scoped>
.imgDni {
    max-width: 45%;
    margin: auto;
}
</style>