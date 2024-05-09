<template>
	<v-container>
		<v-card elevation="4" class="rounded-lg">
			<v-row class="pa-4 justify-center">

				<v-col cols="10" class="py-0" xs="16" sm="10" md="17" lg="12" xl="12">
					<p class="mb-0 primary--text font-weight-bold text-center" style="font-size: 25px;">Consulta el
						estado de tu crédito</p>
				</v-col>

				<v-col cols="12" sm="8" md="7" lg="7" xl="7">
					<div class="px-5 py-3 rounded-lg d-flex" style="color:#222831; background-color: #e9f7ff">
						<v-icon class="primary--text mr-4">
							mdi-information-outline
						</v-icon>
						<p class="mb-0">
							Ingresa tu <strong>id de solicitud </strong>, si no tines una puedes generarla al solicitar
							un crédito.
						</p>
					</div>
				</v-col>

				<v-col cols="11"  sm="8" md="7" lg="7" xl="7">
					<v-row class="flex-column" dense>
						<p class="mb-1" style="color: #9f9ea2;">Id de solicitud</p>
						<v-text-field class="rounded-lg" label="Ej:3717123" solo full-width hide-details
							background-color="#f4f4f4" flat v-model="idCredit"></v-text-field>
					</v-row>
				</v-col>

				<v-col cols="11" sm="8" md="7" lg="7" xl="7">
					<v-row class="justify-center">
						<v-col cols="16" sm="6" md="6" lg="6" xl="6">
							<Button text="Regresar" :isText="true" :click="() => { $router.push('/inicio') }" />
						</v-col>
						<v-col cols="16" sm="6" md="6" lg="6" xl="6">
							<Button text="Consultar crédito" :click="validate" />
						</v-col>
					</v-row>
				</v-col>

			</v-row>


		</v-card>
	</v-container>
	<!-- <v-row align="center" justify="center">
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

	</v-row> -->


</template>
<script>
import Button from '@/components/Button.vue';

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
		idCredit: null
	}),
	components: {
		Button
	},

	methods: {
		validate() {
			this.$emit('success', 2)
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