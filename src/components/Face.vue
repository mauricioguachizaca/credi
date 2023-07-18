<template>
    <v-form ref="form" v-model="valid" class="mt-5" lazy-validation>
        <v-row>
            <v-col md="12" justify="center">
                <v-img max-height="400" class="imgDni" src="@/assets/img/biometrico.png" />
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col md="5">
                <v-btn width="100%" :loading="loading4" :disabled="loading4" color="success"
                    @click="loader = 'loading4'">
                    <v-icon left>
                        {{ face }}
                    </v-icon>
                    Iniciar Validación Biométrica
                    <template v-slot:loader>
                        <span class="custom-loader">
                            <v-icon light>mdi-cached</v-icon>
                        </span>
                        Validando
                    </template>
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="mt-10 mb-10"></v-divider>
    </v-form>
</template>
<script>
import { mdiFaceRecognition } from '@mdi/js';
export default {
    name: 'Face',
    data: () => ({
        face: mdiFaceRecognition,
        loader: null,
        loading4: false,
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
        send() {
            this.$emit('success', 3)
        }
    },
    watch: {
        loader() {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false, this.send()), 3000)

            this.loader = null
        },
    },
}
</script>
<style scoped>
.imgDni {
    max-width: 30%;
    margin: auto;
}

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