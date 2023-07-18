<template>
    <v-form ref="form" v-model="valid" class="mt-5" lazy-validation>
        <v-row>
            <v-col md="5" sm="12" xs="12" cols="12">
                <v-text-field dense outlined v-model="email" :rules="emailRules" label="Correo electrónico"
                    required></v-text-field>
                <v-text-field dense outlined v-model="name" :counter="10" :rules="requiredRule" label="Cédula"
                    required></v-text-field>
                <v-text-field dense outlined v-model="code" :counter="6" :rules="requiredRule" label="Código dactilar"
                    required></v-text-field>
            </v-col>
            <v-col md="7" justify="center" style="display: flex;">
                <v-img max-height="250" class="imgDni" src="@/assets/img/cedula.png" />
            </v-col>
        </v-row>
        <v-checkbox v-model="checkbox" :rules="[v => !!v || 'Acepte para continuar!']"
            label="Acepto la revisión de mis datos financieros" required></v-checkbox>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
            Continuar
        </v-btn>
        <!-- 
        <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
            Reset Validation
        </v-btn> -->
    </v-form>
</template>
<script>
export default {
    name: 'Identification',
    data: () => ({
        valid: true,
        name: '',
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