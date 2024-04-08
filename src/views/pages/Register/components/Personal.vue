<template>
	<v-form ref="form" v-model="valid" class="mt-5" lazy-validation>
		<v-row justify="center">
			<v-col md="5">
				<v-row>
					<v-col md="12">
						<v-select dense v-model="meses" :rules="requiredRule" :items="itemsTipo" outlined attach
							label="Qué tipo de trabajo tienes?">
							<v-icon slot="prepend" color="primary">
								mdi-briefcase
							</v-icon></v-select>
						<div v-if="meses == 'Trabajo para una empresa'">
							<v-text-field label="Cuántos años tienes en este trabajo?" dense outlined
								placeholder="ej: 1" :rules="numberRule" hint required>
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-text-field>
							<v-select dense :rules="requiredRule" :items="['Privado', 'Público']" outlined attach
								label="¿En que sector trabajas?">
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-select>
							<v-text-field label="¿Cuál es el nombre de la empresa?" dense outlined placeholder="ej: 1"
								:rules="requiredRule" hint required>
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-text-field>
							<v-text-field label="¿Qué cargo tienes en la empresa?" dense outlined placeholder="ej: 1"
								:rules="requiredRule" hint required>
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-text-field>
							<v-text-field label="¿Cuánto es tu salario mensual?" dense outlined placeholder="ej: 1"
								:rules="requiredRule" required>
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-text-field>
							<v-text-field label="¿Tienes ingresos adicionales?" dense outlined placeholder="ej: 1"
								:rules="requiredRule"
								hint="Si los tienes, digita el monto de los ingresos no relacionados a la empresa en la que trabajas"
								persistent-hint required>
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-text-field>


						</div>
						<div v-if="meses == 'Tengo negocio propio'">
							<v-text-field label="Cuántos años tiene tu negocio" dense outlined placeholder="ej: 1"
								:rules="numberRule" hint required>
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-text-field>
							<v-select dense :rules="requiredRule" :items="['Privado', 'Público']" outlined attach
								label="Elije tu actividad económica">
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-select>
							<v-text-field label="¿Cuál es el nombre de tu negocio?" dense outlined placeholder="ej: 1"
								:rules="requiredRule" hint required>
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-text-field>
							<v-text-field label="¿Qué cargo tienes en la empresa?" dense outlined placeholder="ej: 1"
								:rules="requiredRule" hint required>
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-text-field>
							<v-text-field label="¿Cuánto es tu ingreso mensual?" dense outlined placeholder="ej: 1"
								:rules="requiredRule"
								hint="Suma el ingreso mensual de tu negocio más algún ingreso adicional si lo tienes."
								persistent-hint required>
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-text-field>
							<v-text-field label="¿Cuánto gastas mensualmente?" dense outlined placeholder="ej: 1"
								:rules="requiredRule" hint="Ingresa el valor de los gastos que realizas en tu negocio"
								persistent-hint required>
								<v-icon slot="prepend" color="warning">
									mdi-help-rhombus
								</v-icon>
							</v-text-field>
						</div>

					</v-col>
				</v-row>

			</v-col>
		</v-row>
		<v-row class="justify-center">
			<v-col cols="3">
				<Button text="Continuar" :click="send" />
			</v-col>
		</v-row>
	</v-form>
</template>
<script>
import Button from '@/components/Button.vue';

export default {
	name: 'Personal',
	data: () => ({
		simulated: false,
		loader: null,
		loading: false,
		valid: true,
		monto: '',
		cuota: '$ 0.00',
		meses: '',
		items: ['6 meses', '12 meses', '24 meses', '48 meses'],
		itemsTipo: ['Trabajo para una empresa', 'Tengo negocio propio'],
		requiredRule: [
			v => !!v || 'Campo requerido',
		],
		numberRule: [
			v => !!v || 'Campo requerido',
		],
	}),
	components: {
		Button
	},
	methods: {
		send() {
			this.$refs.form.validate() && this.$router.push('/resultado')
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