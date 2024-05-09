<template>
	<v-form class="pa-5 rounded justify-space-around" ref="form" v-model="valid" lazy-validation>
		<v-row class=" d-flex justify-center">

			<v-col class="justify-center align-center" cols="12" sm="8" md="5" lg="5" xl="4">
				<v-img max-height="200" class="imgDni" src="@/assets/img/cedula.png" />
			</v-col>


			<v-row class="pa-4 justify-center align-center">
				<v-col cols="12" sm="8" md="7" lg="7" xl="7">
					<v-row class="flex-column" dense>
						<p class="ml-2" style="color: #9f9ea2;">Correo electrónico</p>
						<v-text-field class="rounded-lg" label="Ej.mmm@gmail.com" solo full-width
							background-color="#f4f4f4" flat v-model="email" :rules="emailRules"
							@keypress="handleKeyPress">
						</v-text-field>
					</v-row>
				</v-col>
				<v-col cols="12" sm="8" md="7" lg="7" xl="7">
					<v-row class="flex-column " dense>
						<p class="ml-2" style="color: #9f9ea2;">Cédula</p>
						<v-text-field class="rounded-lg" label="Ej. 0000000000" solo full-width
							background-color="#f4f4f4" flat v-model="name" :counter="10" :rules="requiredRule"
							type="text" @keypress="handleKeyCant">
						</v-text-field>
					</v-row>
				</v-col>
				<v-col cols="12" sm="8" md="7" lg="7" xl="7">
					<v-row class="flex-column " dense>
						<p class="ml-2" style="color: #9f9ea2;">Código dactilar</p>
						<v-text-field class="rounded-lg" label="Ej. 0000000000" solo full-width
							background-color="#f4f4f4" flat v-model="code" :counter="10" :rules="requiredRule"
							type="text" @keypress="handleKeyCant">
						</v-text-field>
					</v-row>
				</v-col>
				<v-col cols="12" sm="8" md="7" lg="7" xl="7">
					<v-checkbox class="ml-3" v-model="checkbox" :rules="[v => !!v || 'Acepte para continuar!']"
						label="Acepto la revisión de mis datos financieros" required></v-checkbox>
				</v-col>

				<v-col cols="12" sm="8" md="7" lg="7" xl="7">
					<v-row class="justify-center">
						<v-col cols="12" sm="6" md="10" lg="6" xl="5">
							<Button text="Regresar" :isText="true" :click="() => { $router.push('/inicio') }" />
						</v-col>
						<v-col cols="12" sm="6" md="10" lg="6" xl="5">
							<Button text="Continuar" :click="validate" />
						</v-col>

					</v-row>
				</v-col>
			</v-row>
		</v-row>
	</v-form>
</template>
<script>
import Button from '@/components/Button.vue';

export default {
	name: 'Identification',
	data: () => ({
		valid: true,
		name: '',
		code: '',
		requiredRule: [
			v => !!v || 'Campo requerido',
			v => /^\d+$/.test(v) || 'Solo se permiten números',
			v => /^[0-9]+$/.test(v) || 'No se permiten caracteres especiales o letras',
		],
		emailRules: [
			v => !!v || 'Campo requerido',
			v => /.+@.+\..+/.test(v) || 'Correo inválido',
		],
		email: '',
		select: null,
		items: [
			'Item 1',
			'Item 2',
			'Item 3',
			'Item 4',
		],
		checkbox: false,
	}),
	components: {
		Button
	},
	methods: {
		handleKeyCant(event) {
			const KeyCode = event.keyCode;

			if ((KeyCode < 48 || KeyCode > 57) && KeyCode !== 46) {
				event.preventDefault();
				this.$toast.error('Solo se permiten números');
			}
		},
		handleKeyPress(event) {
			const keyCode = event.keyCode;
			const key = event.key;

			// Verificar si es una letra mayúscula
			if (key.toUpperCase() === key && key.toLowerCase() !== key && keyCode !== 20) {
				event.preventDefault();
				this.$toast.error('No se permiten letras mayúsculas');
			}
		},



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